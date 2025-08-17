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
                    <div>
                        <h1>Specs</h1>
                        <ul>
                            {Object.entries(product_detail.Specs).map(([id, value])=> {
                                <li>{id} : {value}</li>
                            })}
                        </ul>
                    </div>
                )
            }
            else if (TextType == "Review"){
                return(
                    <div>
                        <h1>Review</h1>
                        <ul>
                            {Object.entries(product_detail.review).map((id, {stars, remark})=> {
                                <div>
                                    <h3>id</h3>
                                    <ul>
                                        <li>Stars: {stars}</li>
                                        <li>Remark: {remark}</li>
                                    </ul>
                                </div>
                                
                            })}
                        </ul>
                    </div>
                )
            }
            else if (TextType === "Compatability"){
                return(
                    <div>
                        <h1>Compatability</h1>
                            
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
            const product_entity = findProductByID(productID);
            console.log("verify entry: \n",product_entity);
            if (product_entity.exist === true){
                setProduct_detail({
                    "id" : product_entity.id,
                    "price" : product_entity.price,
                    "product_name" : product_entity.product_name,
                    "currency" : "$",
                });
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
                                    <h4>{product_detail.product_name}</h4>
                                    <h4>{product_detail.currency + " " + product_detail.price}</h4>
                                </div>
                                <div className="spec_module" onClick={() => openSidebar()}>
                                    <h6>Product spec options</h6>
                                </div>
                                <div className="buy-module">  
                                    <div className="buy-module-button">
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
                    </div>
                    <div className="borderline"></div>
                        <div className="Product_detail">
                            <ul className="detail_buttons">
                                <li>
                                    <button onClick={() =>setTextType("Overview")} className={`px-4 py-2 rounded ${
                                        TextType == "Overview" ? 'background-color: blue' : 'bg-gray-300'}`}>
                                            Overview
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() =>setTextType("Specs")} className={`px-4 py-2 rounded ${
                                        TextType == "Specs" ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                                            Specs
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setTextType("Review")} className={`px-4 py-2 rounded ${
                                        TextType == "Review" ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                                            Review
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setTextType("Compatability")} className={`px-4 py-2 rounded ${
                                        TextType == "Compatability" ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                                            Compatability
                                    </button>
                                </li>
                            </ul>
                            <div className="Detail_Text">
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