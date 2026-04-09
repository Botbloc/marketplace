"use client";
import React, { useContext,useState, useEffect, useMemo ,useRef} from "react";
import Sidebar from '../../components/layout/Product_Filter';
import Search_bar from '../../components/sections/Search_bar';
import product_logic from "../../global_quantity/ProductContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SubHeader from "../../components/layout/SubHeader";
import placeholder from "../../assets/images/landscape-placeholder.svg";
import Product_display from '../../components/sections/Product_display';
import SidebarLayer from "../../components/layout/SidebarLayer";
import {useSidebar} from "../../global_quantity/SidebarContext";
import { useProducts } from "../../components/hooks/useProducts";
import FilterTag from "../../components/elements/FilterTag";

const parseFilters = (searchParams: URLSearchParams | ReturnType<typeof useSearchParams>) => {
  const brands = searchParams.getAll("brand");
  return {
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    inStock: searchParams.get("inStock") === "true" ? true : undefined,

    // NEW fields
    availability: searchParams.get("availability") || undefined, // "in_stock" | "preorder" | "out_of_stock"
    condition: searchParams.get("condition") || undefined,       // "new" | "refurbished" | "used_like_new" | "used_good"
    minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined, // 1..5
    shipping: searchParams.get("shipping") || undefined,         // "domestic" | "international" | "uk" | "eu" | "us"

    sort: searchParams.get("sort") || "default",
  };
};

// mapping table for display
const filterLabels = {
    category: "Category",
    minPrice: "Minimum Price",
    maxPrice: "Maximum Price",
    brand: "Brand",
    sort: "Sort by",
    inStock: "In Stock",
    availability: "Availability",
    condition : "Condition",
    minRating: "Rating",
    shipping: "Shipping"
    // Add more mappings here
};

const Productlist = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {openSidebar} = useSidebar();
    // fetch products from backend instead of context
    const href = "product/";
    
    // 1) Get filters from URL
    const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
    const {
        products,
        error,
        initialLoading,
        loadingMore,
        hasMore,
        loadMore,
    } = useProducts(filters);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // Helper to update URL (source of truth)
    const updateUrl = (patch: Record<string, any>) => {
        const next = new URLSearchParams(searchParams.toString());
        Object.entries(patch).forEach(([k, v]) => {
            next.delete(k);
            if (Array.isArray(v)) v.forEach(x => next.append(k, String(x)));
            else if (v !== undefined && v !== "" && v !== null) next.set(k, String(v));
        });
        router.push(`${pathname}?${next.toString()}`, { scroll: false });
    };

    const clearAll = () => {
        router.push(pathname, { scroll: false });
    };

    useEffect(() => {
        const node = loadMoreRef.current;
        if (!node) return;
        if (initialLoading || loadingMore || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
            const first = entries[0];
            if (first.isIntersecting && hasMore && !loadingMore) {
                loadMore();
            }
            },
            {
                rootMargin: "100px",
                threshold: 0.3,
            }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [hasMore, initialLoading, loadingMore, loadMore]);

    return(
        <>
            <SidebarLayer header="Filter and Sort">
                <Sidebar 
                    value = {filters}
                    onChange = {updateUrl}
                />
            </SidebarLayer>
            <SubHeader
                value = {filters}
                onChange = {updateUrl}
                fnc = {openSidebar}
                clearAll = {clearAll}
            />   
            
            <div className="body-container">    
                <div className="product_list_window">   
                      

                    <div className="filter_tags">
                        <FilterTag
                            filters = {filters}
                            filterLabels = {filterLabels}
                            updateUrl = {updateUrl}
                        />
                    </div>   
                        
                    <div className="product_list">
                        
                        {initialLoading && <p>Loading products...</p>}
                        {error && <p>{error}</p>}

                        {!initialLoading && !error && products.length === 0 && (
                        <p>No products found.</p>
                        )}
                        {!initialLoading && !error && products.length > 0 && (
                        <ul className="product_grid" >
                            
                            {products.map((item)=>(
                                <li className="product_in_grid"
                                    onClick={()=> router.push(href + item.id)}
                                    >
                                    <div className="image_module">
                                        <img src={placeholder.src}/>
                                    </div>
                                    <div className="product_detail_module">
                                        <span className="text-sm" >{item.product_name}</span>
                                        <span className="text-sm">{item.currency+" "+item.price}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        )}
                        <div ref={loadMoreRef} style={{ height: "20px" }} />
                        {loadingMore && <p>Loading more...</p>}
                        {!hasMore && products.length > 0 && <p>End of List.</p>}
                    </div>
                </div>
            </div>
            <Product_display theme="Suggestion" />
        </>
    )
}

export default Productlist;