    "use client";
    import React, { useContext } from "react";
    import {useEffect, useState} from "react";
    import image1 from "../../assets/images/placeholder.jpg";
    import image2 from "../../assets/images/landscape-placeholder.svg";
    import Button from "../elements/Button";
    import product_logic from "../../global_quantity/ProductContext";
    import cart_logic from "../../global_quantity/CartContext";
    import SidebarContext from "../../global_quantity/SidebarContext";
    import Notification from "../../components/elements/Notification";
    import {useRouter,notFound} from "next/navigation";
    import SidebarLayer from "../../components/sections/partials/SidebarLayer";

    // we need image, price, products detail

    // api call, now load with preloaded iamges
    //const loadImage = async () =>{  

    //}

    const product_detail_template = {
        "product_name": "Product 1",
        "price" : 0,
        "currency" : "$",
        "description": "Template Description",
        "Specs" : {
            "spec 1" : 0,
            "spec 2" : 0,
            "spec 3" : 0,
            "spec 4" : 0,
        },
        "review" : {
            "user 1" : {
                "stars" : 5,
                "remark" : "Template Remark"
            },
            "user 2" : {
                "stars" : 5,
                "remark" : "Template Remark"
            }
        }
        
    }


    // storing iamges for rotation
    let product_iamges = [
        {"id" : 0 ,"img_src" : image1},
        {"id" : 1 ,"img_src" : image1},
        {"id" : 2 ,"img_src" : image1},
        {"id" : 3 ,"img_src" : image1}
    ]


    const Product = ({productID,...prop})=>{

        const router = useRouter();

        const [toastVisible, setToastVisible] = useState(false);

        const [Display, setDisplay] = useState();

        const {addCart} = useContext(cart_logic);

        const [noti_msg, setNoti_msg] = useState("");

        const {isOpen, openSidebar, sidebarContent} = useContext(SidebarContext);

        const {products, findProductByID} = useContext(product_logic);

        const option = [{},{},{},{}];

        const [product_detail, setProduct_detail] = useState({
            "product_name": "Product 1",
            "price" : 0,
            "currency" : "$",
            "description": "Template Description",
            "Specs" : {
                "spec 1" : 0,
                "spec 2" : 0,
                "spec 3" : 0,
                "spec 4" : 0,
            },
            "review" : {
                "user 1" : {
                    "stars" : 5,
                    "remark" : "Template Remark"
                },
                "user 2" : {
                    "stars" : 5,
                    "remark" : "Template Remark"
                }
            }
        });

        const setQuan = (type, quan) =>{
        if (type === "+"){
            setQuantity(quantity+1);
        }
        else if (type === "-"){
            if (quantity >0){
                setQuantity(quantity-1);
            }
        }
        else if (type === "NA"){
            setQuantity(quan);
        }
    }

        useEffect(()=>{
            setDisplay(image2);
            console.log("image1: ",image2);
            console.log("image1: ",Display);
            //loadImage; // call api to draw images from drive to local 
        },[])

        // switch between Detail, Statistics, and review
        const [TextType, setTextType] = useState("Overview");
        const [quantity, setQuantity] = useState(0);
        const [isValid, setIsValid] = useState(true);
        

        const confirmToCart = (e) => {
           
            const reply = addCart(productID, quantity);
            setToastVisible(true);
            setNoti_msg(reply);
            
            
        }

        const onQuanChange = (value)=>{
            if ((Number(value) >= 0 && /^[0-9]*$/.test(value))){
                setQuan("NA",value);
            }
            
        }

        const setDetailTextDisplay = () => {
            if (TextType == "Overview"){
                return(
                    <div>
                        <h1>Overview</h1>
                        <p>{product_detail.description}</p>
                    </div>
                )
            }
            else if (TextType == "Specs"){
                return(
                    <ul>
                        {   product_detail.specs &&
                            Object.entries(product_detail.specs).map(([key, value])=> (
                                <li key={key}>
                                    <span className="key">{key}</span>
                                    <span className="value">{value}</span>
                                    
                                </li>
                            ))
                        }
                        
                        
                    </ul>
                )
            }
            else if (TextType == "Review"){
                return(
                        <ul>
                            { product_detail.review &&
                            Object.entries(product_detail.review).map((id, {stars, remark})=> {
                                <div>
                                    <h3>id</h3>
                                    <ul>
                                        <li>Stars: {stars}</li>
                                        <li>Remark: {remark}</li>
                                    </ul>
                                </div>
                                
                            })}
                        </ul>
                )
            }
            else if (TextType === "Compatibility"){
                return(
                    <div>
                        <h1>Compatibility</h1>
                            
                    </div>
                )
                
            }
            else{
                return(
                    <div>
                        <h3>Error in display</h3>
                    </div>
                )
            }

        }

        const verifyEntry = () => {
            // find product by id to confirm entry exists
            const product_entity = findProductByID(productID);
            console.log("verify entry: \n",product_entity);
            if (product_entity.exist === true){
                setProduct_detail(product_entity.data);
                
                return true;
            }
            else{
                return false;
            }
        }

        useEffect(() => {
            if (products && products.length > 0){
                if (!verifyEntry()){
                    setIsValid(false);
                    router.push("/product");
            }
            }
            
        },[products])

        if (isValid){
            return(   
            <>  
                <SidebarLayer />
                <Notification
                        message={noti_msg}
                        visible={toastVisible}
                        onClose={() => setToastVisible(false)}
                    />
                    {
                        Display && <div className="product">

                        

                    <div className="row">
                            <div className="col-md-6 left-pane" >
                                <div className="Big_Img">
                                    
                                    {//console.log("DIsplay: ",Display)
                                    }
                                    <img src={Display.src} className="large_img_config"/>
                                </div>
                                <ul className="small_Imgs">
                                    {(product_iamges).map(({id,img_src}) => (
                                        <li className="small_img_icon" key={id}>
                                            {//console.log("image src: ", img_src)
                                            }
                                            
                                            <img src={img_src.src} className="small_img_config"/>
                                        </li>
                                    ))}
                                </ul>
                                
                            </div>

                            <div className="col-md-6 right-pane">
                                <div className="price_tag">
                                    <h5 className="id_text" >{product_detail.id}</h5>
                                    <h4>{product_detail.product_name}</h4>
                                    <h5>{product_detail.description}</h5>
                                    <h5 className="status_text">{product_detail.status + " | " + product_detail.delivery_status }</h5>
                                    <div className="review">
                                        {Array.from({ length : Math.round(product_detail.rating)}, (_,i)=>(
                                            <span key={"full-" + i} className="star">★</span>
                                        ))}
                                        {/* Empty stars */}
                                        {Array.from({ length: 5 - Math.round(product_detail.rating) }, (_, i) => (
                                            <span key={"empty-" + i} className="star">☆</span>
                                        ))}
                                        <span>({(product_detail.rating.toFixed(1))})</span>
                                        <span>({product_detail.review? product_detail.review.length : 0 })</span>
                                    </div>
                                    <h3>{product_detail.currency + " " + product_detail.price}</h3>
                                </div>
                                <div className="spec_module" onClick={() => openSidebar()}>
                                    <div className="spec_text">
                                        <h5>Options</h5>
                                        <span>{"View All >>"}</span>
                                    </div>
                                    <div className="Option_buttons">
                                        {option.map((item)=>(
                                            <button
                                                onClick={(e)=>{
                                                    e.stopPropagation();
                                                }}
                                            >
                                                {<img src={image2.src}/>
                                                }
                                            </button>
                                        ))}
                                    </div>
                                    
                                    
                                </div>
                                <div className="buy-module">  
                                    
                                        <div className="buy-module-container">
                                    
                                        <div className="buy_quantity">
                                            <button onClick={()=> setQuan("-")}>-</button>
                                            <input type="text" onChange={(e)=> {onQuanChange(e.target.value)}} value={quantity}></input>
                                            <button onClick={()=> setQuan("+")}>+</button>  

                                        </div>
                                        <button onClick={(e)=> confirmToCart()} className="confirm_button">Add to cart</button>
                                        </div>             
                                    
                                </div>
                                
                            </div>
                    </div>
                    
                    <div className="Product_detail">
                        <ul className="detail_buttons">
                            <li>
                                <button onClick={() =>setTextType("Overview")} className={
                                    TextType == "Overview" ? 'selected' : ''}>
                                        Overview
                                </button>
                            </li>
                            <li>
                                <button onClick={() =>setTextType("Specs")} className={
                                    TextType == "Specs" ? 'selected' : ''}>
                                        Specs
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setTextType("Review")} className={
                                    TextType == "Review" ? 'selected' : ''}>
                                        Review
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setTextType("Compatibility")} className={
                                    TextType == "Compatibility" ? 'selected' : ''}>
                                        Compatibility
                                </button>
                            </li>
                            <div className="borderline"></div>
                        </ul>
                        <div className="detail_text">
                            {setDetailTextDisplay()}
                        </div>
                    </div>
                    
                    </div>
                    }
                    
                    {//set it to layout and add a context for it
                    }
                
            </>
        )
        }
        

        
    }

    export default Product;