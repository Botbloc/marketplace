"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import {useRouter} from "next/navigation";
import Accordion  from "../elements/Accordion"
const Sidebar = () => {
    const [expand, setExpand] = useState(true);
    const router = useRouter();
    const [selected, setSelected] = useState(0); 

    const NAV = [
        { id: 0, label: 'Dashboard', href: '/admin' },
        { id: 1, label: 'User Detail', href: '/admin/users' },
        { id: 2, label: 'Products', href: '/admin/products' },
        { id: 3, label: 'Orders', href: '/admin/orders' }
    ];

    const sidebar_footer = [
        {id : 0, label: 'settings', href: '/admin/settings' , children : [
            {id: 0, label: 'something1' , href: '/admin/orders' },
            {id: 1, label: 'something2' , href: '/admin/orders' }
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
                            <button 
                            onClick={()=>{
                                router.push(item.href)
                                setSelected(item.id);
                            }}
                            className={selected === item.id? 'selected' : ''}
                            >
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