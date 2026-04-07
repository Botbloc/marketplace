"use client";
import React, { useContext,useState, useEffect, useMemo } from "react";
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
    page: Number(searchParams.get("page") || "1"),
  };
};

// filter: price, availability, condition, rating, shipping location

const Productlist = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {openSidebar} = useSidebar();
    // fetch products from backend instead of context
    const href = "product/";
    
    // 1) Get filters from URL
    const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
    const { products, loading, error, meta } = useProducts(filters);

    // Helper to update URL (source of truth)
    const updateUrl = (patch: Record<string, any>) => {
        const next = new URLSearchParams(searchParams.toString());
        Object.entries(patch).forEach(([k, v]) => {
            next.delete(k);
            if (Array.isArray(v)) v.forEach(x => next.append(k, String(x)));
            else if (v !== undefined && v !== "" && v !== null) next.set(k, String(v));
        });
        if (!("page" in patch)) next.set("page", "1"); // reset page on filter change
        router.push(`${pathname}?${next.toString()}`, { scroll: false });
    };

    const clearAll = () => {
        router.push(pathname, { scroll: false });
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

    const filterTagGeneration = () => {
        return Object.entries(filters)
        .filter(([key, value]) =>
        key !== "page" &&
        value !== undefined &&
        value !== "" &&
        value !== null
        )
        .map(([key, value]) => {
            const label = filterLabels[key] || key; 
            return(
                <>
                    <div key={label} className="tag">
                        <div className="tag_detail">
                            {label}: {value}
                        </div>
                        <div 
                            className="remove_tag"
                            onClick={()=>{
                                updateUrl({[key] : undefined})
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24">
                                <rect x="0" fill="none" width="24" height="24"/>
                                <g>
                                <path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"/>
                                </g>
                            </svg>
                        </div>
                    </div>  
                    
                </>
            )
             
        })
    }

    return(
        <>
            
            <SidebarLayer header="Filter and Sort">
                <Sidebar 
                    value = {filters}
                    onChange = {updateUrl}
                />
                
            </SidebarLayer>
            
            <div className="body-container">    
                <div className="product_list_window">   
                    <SubHeader
                        value = {filters}
                        onChange = {updateUrl}
                        fnc = {openSidebar}
                        clearAll = {clearAll}
                    />     

                    <div className="filter_tags">
                        {filterTagGeneration()}
                    </div>   
                        
                    <div className="product_list">
                        
                        {loading && <p>Loading products...</p>}
                        {error && <p>{error}</p>}

                        {!loading && !error && products.length === 0 && (
                        <p>No products found.</p>
                        )}
                        {!loading && !error && products.length > 0 && (
                        <ul className="product_grid" >
                            
                            {products.map((item)=>(
                                <li className="product_in_grid"
                                    onClick={()=> router.push(href + item.id)}
                                    >
                                    <div className="image_module">
                                        <img src={placeholder.src}/>
                                    </div>
                                    <div className="product_detail_module">
                                        <span className="text-sm" >{item.name}</span>
                                        <span className="text-sm">{item.currency+" "+item.price}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        )}
                    </div>
                    <div className="pagination_section">
                        {!loading && !error && (meta?.totalPages ?? 1) > 1 && (
                        <div className="pagination_controls">
                            <button
                            disabled={(filters.page ?? 1) <= 1}
                            onClick={() =>
                                updateUrl({ page: Math.max((filters.page ?? 1) - 1, 1) })
                            }
                            >
                            Previous
                            </button>

                            <span>
                            Page {meta?.page ?? filters.page ?? 1} of {meta?.totalPages ?? 1}
                            </span>

                            <button
                            disabled={(filters.page ?? 1) >= (meta?.totalPages ?? 1)}
                            onClick={() =>
                                updateUrl({ page: (filters.page ?? 1) + 1 })
                            }
                            >
                            Next
                            </button>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <Product_display theme="Suggestion" />
        </>
    )
}

export default Productlist;