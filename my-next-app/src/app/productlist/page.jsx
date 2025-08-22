"use client";
import React, { useContext,useState, useEffect, useMemo } from "react";
import Sidebar from '../../components/layout/Sidebar';
import Search_bar from '../../components/sections/Search_bar';
import product_logic from "../../global_quantity/ProductContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SubHeader from "../../components/layout/SubHeader";
import placeholder from "../../assets/images/landscape-placeholder.svg";
import Product_display from '../../components/sections/Product_display';

let array1 = [
    
]

const parseFilters = (searchParams) => {
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

    sort: searchParams.get("sort") || "relevance",
    page: Number(searchParams.get("page") || "1"),
  };
};

// filter: price, availability, condition, rating, shipping location

const Productlist = () => {
    const { allProducts = [] } = useContext(product_logic);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    // 1) Get filters from URL
    const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
    
    const [loading, setLoading] = useState(false); // for data fetching

    // Helper to update URL (source of truth)
    const updateUrl = (patch) => {
        const next = new URLSearchParams(searchParams.toString());
        Object.entries(patch).forEach(([k, v]) => {
            next.delete(k);
            if (Array.isArray(v)) v.forEach(x => next.append(k, String(x)));
            else if (v !== undefined && v !== "" && v !== null) next.set(k, String(v));
        });
        if (!("page" in patch)) next.set("page", "1"); // reset page on filter change
        router.push(`${pathname}?${next.toString()}`, { scroll: false });
    };



    const filteredProducts = useMemo(() => {
        let out = Array.isArray(allProducts) ? allProducts : [];

        if (filters.category) out = out.filter((p) => p.category === filters.category);
        if (filters.minPrice !== undefined) out = out.filter((p) => p.price >= filters.minPrice);
        if (filters.maxPrice !== undefined) out = out.filter((p) => p.price <= filters.maxPrice);
        if (filters.brand?.length) out = out.filter((p) => filters.brand.includes(p.brand));
        if (filters.inStock !== undefined) out = out.filter((p) => Boolean(p.stock > 0) === filters.inStock);

        if (filters.availability) {
        if (filters.availability === "in_stock") out = out.filter((p) => (p.stock ?? 0) > 0);
        if (filters.availability === "preorder") out = out.filter((p) => p.preorder === true);
        if (filters.availability === "out_of_stock") out = out.filter((p) => (p.stock ?? 0) === 0);
        }

        if (filters.condition) out = out.filter((p) => p.condition === filters.condition);
        if (filters.minRating) out = out.filter((p) => (p.rating ?? 0) >= filters.minRating);
        if (filters.shipping) out = out.filter(
        (p) => Array.isArray(p.shipping) && p.shipping.includes(filters.shipping)
        );

        switch (filters.sort) {
        case "price_asc":
            out = [...out].sort((a, b) => a.price - b.price);
            break;
        case "price_desc":
            out = [...out].sort((a, b) => b.price - a.price);
            break;
        case "newest":
            out = [...out].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        // relevance: leave as-is
        }
        return out;
    }, [allProducts, filters]);

    // 4) Pagination
    const pageSize = 24;
    const start = (filters.page - 1) * pageSize;
    const pageItems = filteredProducts.slice(start, start + pageSize);

    useEffect(()=>{
        console.log("all product: \n", allProducts);
    },[allProducts])
    const href = "product/";

    return(
        <>
            <SubHeader
                value = {filters}
                onChange = {updateUrl}
            />
            <div className="body-container">      
                <main className="product_list_window">          
                <div className="product_list">
                    <Sidebar 
                        value = {filters}
                        onChange = {updateUrl}
                    />
                    <ul className="product_grid" >

                        {pageItems.map((item)=>(
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
                        {array1.map((item)=>(
                            <li className="product_in_grid_empty">
                                
                            </li>
                        ))}
                    </ul>
                </div>
               
                
                </main>
                <Product_display theme="Suggestion" />
            </div>
        </>
    )
}

export default Productlist;