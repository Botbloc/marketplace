"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import {useRouter} from "next/navigation";
import Accordion  from "../elements/Accordion"
const Sidebar = () => {
    const [expand, setExpand] = useState(true);
    const router = useRouter();

    const NAV = [
        { id: 0, label: 'User Detail', href: '/users' },
        { id: 1, label: 'Products', href: '/products' },
        { id: 2, label: 'Orders', href: '/orders' }
    ];

    const sidebar_footer = [
        {id : 0, label: 'settings', href: '/settings' , children : [
            {id: 0, label: 'something1' , href: '/orders' },
            {id: 1, label: 'something2' , href: '/orders' }
        ] }
    ]

    return (
        <div className={['Sidebar', expand ? 'expand' : ''].join(' ')}> 
            <div className='Sidebar_inner'>
        
                <div  
                    className='sizing_toggle'
                    onClick={()=>{
                        setExpand(true);
                    }}
                >
                <ul className="">
                    {NAV.map((item)=>(
                        <li key={item.id} className='box'>
                            <button onClick={()=>(router.push(item.href))}>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
                

                </div>
            </div>
            <div className='Sidebar_footer'>
                <ul className="">
                    {sidebar_footer.map((item)=>(
                        <li key={item.id} className='box'>
                            {item?.children && 
                                <Accordion title={item.label} mobileOnly={false}>
                                    <ul>
                                        {item.children.map((item2)=>(
                                            <li key={item2.label} >
                                                <button onClick={()=>(router.push(item2.href))}>
                                                    {item2.label}
                                                </button>
                                                
                                            
                                            </li>
                                        ))}
                                    </ul>
                                </Accordion>
                            }
                            {!item?.children && 
                                <button onClick={()=>(router.push(item.href))}>
                                    
                                    <span>{item.label}</span>
                                </button>
                            }
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;