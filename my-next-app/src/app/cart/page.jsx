"use client";
//import React from "react";
import {useState, useEffect, useContext, useRef} from "react";
import cart_logic from "../../global_quantity/CartContext";
import product_logic from "../../global_quantity/ProductContext";
import Link from "next/link";
import {useRouter} from "next/navigation";
import image2 from "../../assets/images/landscape-placeholder.svg";
import trash_bin from "../../assets/images/trash_can.svg";
import Product_display from '../../components/sections/Product_display';

const template_product = [
    {
        "id" : 0,
        "product_name" : "Product 1",
        "price" : 100,
        "currency" : "$",
        "quantity" : 3
    },
    {
        "id" : 1,
        "product_name" : "Product 2",
        "price" : 300,
        "currency" : "$",
        "quantity" : 2
    },
    {
        "id" : 2,
        "product_name" : "Product 3",
        "price" : 600,
        "currency" : "$",
        "quantity" : 4
    },
    {
        "id" : 3,
        "product_name" : "Product 4",
        "price" : 600,
        "currency" : "$",
        "quantity" : 4
    },
    {
        "id" : 4,
        "product_name" : "Product 5",
        "price" : 600,
        "currency" : "$",
        "quantity" : 4
    },
    {
        "id" : 5,
        "product_name" : "Product 6",
        "price" : 6000,
        "currency" : "$",
        "quantity" : 1
    },
    {
        "id" : 6,
        "product_name" : "Product 7",
        "price" : 60,
        "currency" : "$",
        "quantity" : 1
    },
    {
        "id" : 7,
        "product_name" : "Product 8",
        "price" : 200,
        "currency" : "$",
        "quantity" : 8
    }
]


const Cart = () =>{
    const [product_in_cart, setProduct] = useState([]);
    const {product} = useContext(product_logic);
    const {product_in_cart_Context, addCart, removeCart} = useContext(cart_logic);
    const [currency, setCurrency] = useState("$");
    const [total, setTotal] = useState(0);
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState([]);
    const [display,setDisplay] = useState();
    const boxRef = useRef(null);


    useEffect(() => {
        const box = boxRef.current;
        if (!box) return; // guard

        let leaveTimer, idleTimer;

        const handleMouseOver = () => {
            clearTimeout(leaveTimer);
            box.classList.add("show-scrollbar");
        };

        const handleMouseOut = () => {
            leaveTimer = setTimeout(() => {
                box.classList.remove("show-scrollbar");
            }, 120);
        };

        const handleScroll = () => {
            box.classList.add("show-scrollbar");
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                box.classList.remove("show-scrollbar");
            }, 600);
        };

        box.addEventListener("mouseover", handleMouseOver);
        box.addEventListener("mouseout", handleMouseOut);
        box.addEventListener("scroll", handleScroll);

        return () => {
            box.removeEventListener("mouseover", handleMouseOver);
            box.removeEventListener("mouseout", handleMouseOut);
            box.removeEventListener("scroll", handleScroll);
        };
    },[]);

    // get data from context
    useEffect(() => {
        console.log("hi");
        setDisplay(image2);
        if (product_in_cart_Context.length >= 0){
            setProduct(product_in_cart_Context);
            calculateTotal();
        }
    },[product_in_cart_Context])

    const calculateTotal = () => {
        let temp = 0;
        product_in_cart_Context.map(({quantity, price}) => {
            temp += quantity * price;
        })
        setTotal(temp);
    }

    const generateHeader = (e) => {
        return(
            <div className="product_header">
                <div className="checkbox_wrapper">
                    <input 
                        className="header_checkbox"
                        type="checkbox"
                        checked={selectedItem.length === product_in_cart.length && selectedItem.length>0}
                        onClick={
                            (e)=> {
                                e.stopPropagation();
                                if (e.target.checked) {
                                // select all
                                    setSelectedItem(product_in_cart.map(item => item.id));
                                } else {
                                // clear all
                                    setSelectedItem([]);
                                }
                                console.log("selected item id list: ", selectedItem);
                            }
                        }
                    >
                    </input>
                </div>
                <div className="header_center_module">
                    <div className="item_detail_module_header">
                        <div className="cell">
                            Product
                        </div>
                    </div>
                        
                    <div className="item_price_module_header">
                        <div className="cell">
                            Unit Price
                        </div>
                        <div className="cell">
                            Qty
                        </div>
                        <div className="cell">
                            Subtotal
                        </div>
                    </div>
                </div>
                <div className="delete_module">
                    <img 
                        src={trash_bin.src} 
                        alt="Logo" 
                        className="delete_button_img"
                        onClick={(e)=> {
                            e.stopPropagation();
                            console.log("selectedItem: ", selectedItem);
                            removeCart(selectedItem);
                            
                        }}
                        />
                </div>
                
            </div>
        )
    }

    const generateProductEntity = (e) => {
        const href = "product/";
        return(
            <div ref={boxRef} className="product_container">
                {//console.log("product from context: ", product)
                }
                {product_in_cart.map((item) => {
                    return(
                        
                        <div className=
                            "product_in_cart" 
                            key={item.id}
                            onClick={()=> router.push(href + item.id)}
                            >
                                 <div className="checkbox_wrapper">
                                    <input
                                        type="checkbox"
                                        checked={selectedItem.includes(item.id)}
                                        onClick={
                                            (e)=> {
                                                e.stopPropagation();
                                                if (e.target.checked) {
                                                    setSelectedItem([...selectedItem, item.id]);
                                                }
                                                else{
                                                    setSelectedItem(prev => prev.filter(id => id !== item.id));
                                                }
                                            }
                                        }   
                                        className= "item_checkbox"
                                    >
                                    </input>
                                </div>
                                <div className="item_center_module">
                                    <div className="item_name_module">
                                    
                                        <div className="cell">
                                            <div className=" product_img">
                                            
                                                    <img src={display.src} className="large_img_config"/>
                                                    
                                            </div>
                                        </div>

                                        <div className="cell">
                                            
                                            <span>{item.product_name}</span>
                                        </div>
                                        
                                    </div>
                                    <div className="item_price_module">
                                        <div className="cell">{item.currency + " " + item.price}</div>
                                        <div className="cell">{item.quantity}</div>
                                        <div className="cell">{item.currency + " " + item.price * item.quantity}</div>
                                    </div>
                                </div>
                                <div className="delete_module">
                                    <img 
                                        src={trash_bin.src} 
                                        alt="Logo" 
                                        className="delete_button_img"
                                        onClick={(e)=> {
                                            e.stopPropagation();
                                            console.log("clicked");
                                            removeCart(item.id);
                                        }}
                                        />
                                </div>
                        </div>      
                    )                 
                })}
            </div>
        )
    }



    const dummy = 120;
    return(
        product_in_cart != undefined
        && <div className="cart_window">
            <div className="cart_heading">

                    <h4>Your Shopping Cart</h4>
                
                <div className="heading_purchase">
                    <h4>Total: ${total.toFixed(2)}</h4>
                    <button>Proceed to checkout</button>
                </div>
                
            </div>
            
            <div className="left_pane">             
                {generateHeader()}
                {generateProductEntity(product_in_cart)}
            </div>
                
            <Product_display theme="Suggestion" />   
            
        </div>     
        
    )
} 

export default Cart;
