"use client";
import React from "react";
import Carousel from "../elements/Carousel";
import {useContext, useRef, useCallback, useEffect,useState} from "react";
import ProductContext from "../../global_quantity/ProductContext";
import { useRouter } from "next/navigation";
import SlideButton from "../elements/SlideButton";
import Carosel_indicator from "../elements/Carousel_indicator";


const Product_display = ({theme})=>{
    const listRef = useRef(null);
    const router = useRouter();
    let header = "";
    const {allProducts} = useContext(ProductContext); 
    const [activeIndex, setActiveIndex] = useState([]);
    let display_entity = [];
    const href = "/product/";
    switch (theme) {
        case "Trending":
            header = "Trending";
            display_entity = allProducts
                .filter(p => p.rating >= 5) // filter first
                .slice(0, 10);               // then take first 10
            
            break;
    
        case "Suggestion":
            display_entity = allProducts
                //.filter(p => p.rating >= 5) // filter first
                .slice(0, 10);               // then take first 10
            header = "Suggested for you";
            break;
    }


    useEffect(() => {
        const el = listRef.current;
        if (!el) return;

        const cards = el.querySelectorAll(".card");

        // compute how many cards fit in container
        let visibleCount = 1;
        if (cards.length > 0) {
            const containerWidth = el.clientWidth;
            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(el).gap || 0);
            const padding = parseFloat(getComputedStyle(el).padding || 0);
            visibleCount = Math.max(
            1,
            Math.floor(containerWidth / (cardWidth + gap-padding*2))
            );
            console.log("containerWidth: ", containerWidth);
            console.log("cardWidth: ", cardWidth);
            console.log("gap: ", gap);
            console.log("divider: ", cardWidth + gap+padding*2);

        }

        let lastScrollLeft = 0;

        const observer = new IntersectionObserver(
            (entries) => {
            const listOfId = Array.from({ length: cards.length }, () => false);

            // figure out scroll direction
            const dir = el.scrollLeft > lastScrollLeft ? "right" : "left";
            lastScrollLeft = el.scrollLeft;

            // collect intersecting indices
            const indices = entries
                .filter((entry) => entry.isIntersecting)
                .map((entry) => Array.from(cards).indexOf(entry.target));

            if (indices.length) {
                if (dir === "right") {
                // anchor at the rightmost visible index
                const anchor = Math.max(...indices);
                for (
                    let i = anchor;
                    i > anchor - visibleCount && i >= 0;
                    i--
                ) {
                    listOfId[i] = true;
                }
                } else {
                // anchor at the leftmost visible index
                const anchor = Math.min(...indices);
                for (
                    let i = anchor;
                    i < anchor + visibleCount && i < cards.length;
                    i++
                ) {
                    listOfId[i] = true;
                }
                }
            }

            setActiveIndex(listOfId);
            },
            { root: el, threshold: 0.6 }
        );

        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, []);
    
    


    const swipe = useCallback((dir) => {
        const el = listRef.current;
        if (!el) return;
        const amount = 100;
        el.scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth",
        });
    }, []);


    const generateDisplayCard = (item) =>{
        //console.log(item);
        return(
            <div className="card" onClick={() => router.push(href+item.id)}>
                <h3>{item.product_name}</h3>
                <p>From {item.currency + "" + item.price}</p>
                <h4>Learn more →</h4>
            </div>
        )
    }

    return(
        <div className="product_display">
            <h3>{header}</h3>
            <SlideButton dir="left" onClick={() => swipe("left")} />
            <div className="product_display_inner" ref={listRef}>
                {display_entity.map((item)=>(
                    generateDisplayCard(item)
                ))}
            </div>
            <SlideButton dir="right" onClick={() => swipe("right")} />
            <Carosel_indicator item_list={activeIndex}  />
        </div>
        
    )
}

export default Product_display;