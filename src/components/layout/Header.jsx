  'use client';

  import React, { useContext, useEffect, useRef, useState } from 'react';
  import Link from 'next/link';
  import Logo from './partials/Logo';
  import cart_logic from '../../global_quantity/CartContext';
  import {useRouter} from "next/navigation";
  import login_icon from "../../assets/images/login_icon.svg";
  import AuthContext from '../../global_quantity/AuthContext';
  
  
  
  const NAV = [
    { id: 0, label: 'R-Cores', href: '/r-cores' },
    { id: 1, label: 'Components', href: '/components' },
    { id: 2, label: 'Apps', href: '/apps' },
    {
      id: 3, label: 'Business', children: [
        { id: 0, label: 'Uses cases', href: '/uses_cases' },
        { id: 1, label: 'Book a demo', href: '/book-a-demo' },
      ]
    },
    {
      id: 4, label: 'Developers', children: [
        { id: 0, label: 'Documentation', href: '/Docs' },
        { id: 1, label: 'Learning', href: '/learning' },
        { id: 2, label: 'Community', href: '/community' },
        { id: 3, label: 'Selling with us', href: '/selling-with-us' }
      ]
    },
    {
      id: 5, label: 'About', children: [
        { id: 0, label: 'About us', href: '/about' },
        { id: 1, label: 'Press and release', href: '/press_and_release' },
        { id: 2, label: 'Investors', href: '/investors' },
        { id: 3, label: 'Sustainability', href: '/sustainability' },
        { id: 4, label: 'Careers', href: '/careers' },
        { id: 5, label: 'Contact us', href: '/contact_us' },
      ]
    },
    { id: 6, label: 'Shop', href: '/productlist' },
  ];

  export default function Header({ className = '', hideSignin = false, navPosition = '' }) {
    const [open, setOpen] = useState(false);              // mobile nav, open == true for mobile, css listens for .is-active
    const [openDropdown, setOpenDropdown] = useState(null); // mobile: which dropdown is open
    const headerRef = useRef(null);
    const { product_in_cart_Context } = useContext(cart_logic);
    const router = useRouter();
  // scroll-aware visibility
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);
    const [screenWidth, setScreenWidth] = useState(0);
    const {auth_in_context, userData} = useContext(AuthContext);

    // Close on ESC
    useEffect(() => {
      const onEsc = (e) => e.key === 'Escape' && setOpen(false);

      const THRESHOLD = 6; // px to avoid flicker

      const onScroll = () => {
        const current = window.scrollY || 0;

        // throttle via rAF
        if (!ticking.current) {
          window.requestAnimationFrame(() => {
            const delta = current - lastScrollY.current;

            if (current < 10) {
              // near top: always show
              setShow(() => true);
            } else if (Math.abs(delta) > THRESHOLD) {
              // significant movement
              if (delta > 0) {
                // scrolling down -> hide
                setShow(() => false); // scrolling down
              } else {
                // scrolling up -> show
                setShow(() => true);  // scrolling up
              }
            }

            lastScrollY.current = current;
            ticking.current = false;
          });
          ticking.current = true;
        }
      };

      document.addEventListener('keydown', onEsc);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        document.removeEventListener('keydown', onEsc);
        window.removeEventListener('scroll', onScroll);
      };
    }, [lastScrollY]);

    useEffect(() => {
      // This only runs in the browser
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      handleResize();                     // set initial value
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const headerClasses = [
      'site-header',
      className,
      show ? 'visible' : 'hidden',
      open ? 'force-visible' : '' // keep header visible while mobile menu is open
    ].filter(Boolean).join(' ');
    const innerClasses = 'site-header-inner';
    const navClasses = ['header-nav', open ? 'is-active' : ''].join(' '); 

    const closeAll = () => { // used after clicking any link: it collapses the mobile menu and any open dropdowns.
      setOpen(false);
      setOpenDropdown(null); 
    };

    const toggleDropdown = (id) => { // 
      // Desktop uses :hover; this is for touch/mobile
      setOpenDropdown((cur) => (cur === id ? null : id));
    };

    const href = "";
    const [selected, setSelected] = useState(null);

    const profile_login_render = () => {
        const status = auth_in_context.isLoggedIn;
        console.log("status: ",status );
        if (status){
            let profile_pic = null;
            const initial = userData?.username
              ? userData.username
                ?.split(" ")
                .map(name => name[0])
                .join("")
                .toUpperCase()
              : "" ;
            console.log(initial);
            if (userData?.profile_picture && userData?.profile_picture!==""){
              profile_pic = userData?.profile_picture?.src;
              return(
                <Link href="/profile" onClick={closeAll} className="button_1">
                  <img src={profile_pic} alt={initial}/>
                </Link>
              )
            }
            else{
              return(
                <Link href="/profile" onClick={closeAll} className="button_1">
                    <div className="avatar-fallback">
                      {initial}
                    </div>
                </Link>
              )
            }
        }
        else{
          return(
            <Link href="/login" onClick={closeAll} className="button_2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="login_icon">
                  <path d="M9.954,241.305h228.441c3.051,0,5.896-1.246,7.805-3.416c1.659-1.882,2.393-4.27,2.078-6.723    c-5.357-41.734-31.019-76.511-66.15-95.053c-14.849,14.849-35.348,24.046-57.953,24.046s-43.105-9.197-57.953-24.046    C31.09,154.65,5.423,189.432,0.071,231.166c-0.315,2.453,0.424,4.846,2.078,6.723C4.058,240.059,6.903,241.305,9.954,241.305z"/>
                  <path d="M72.699,127.09c1.333,1.398,2.725,2.73,4.166,4.019c12.586,11.259,29.137,18.166,47.309,18.166    s34.723-6.913,47.309-18.166c1.441-1.289,2.834-2.622,4.166-4.019c1.327-1.398,2.622-2.828,3.84-4.329    c9.861-12.211,15.8-27.717,15.8-44.6c0-39.216-31.906-71.116-71.116-71.116S53.059,38.95,53.059,78.16    c0,16.883,5.939,32.39,15.8,44.6C70.072,124.262,71.366,125.687,72.699,127.09z"/>
              </svg>
            </Link>
          )
        }
    };
    

    return (
      <header ref={headerRef} className={headerClasses}>
        
          <div className={innerClasses}>
            <Logo />

            {/* Hamburger (visible on mobile via CSS below) */}
            <button
              className="header-nav-toggle"
              aria-expanded={open ? 'true' : 'false'}
              aria-controls="site-nav"
              onClick={() => {
                setOpen((v) => !v);
                if(openDropdown){
                  closeAll();
                }
                
              }}
            >
              
              <span className="hamburger"></span>
            </button>

            <nav id="site-nav" className={navClasses}>
              <div className="header-nav-inner">
                <ul className="header-nav-left">
                  {NAV.map((item) => {
                    if (!item.children) {
                      return (
                        <li key={item.id} className="header_item">
                          <button type="button" onClick={() => { 
                              closeAll();
                              router.push(item.href);
                              
                              }}>
                            {item.label}
                          </button>
                          
                        </li>
                      );
                    }
                    else{
                      const isOpen = openDropdown === item.id;
                      
                      const screen_width_check = screenWidth <= 960;
                  
                      return (
                      <li key={item.id} className={`dropdown ${isOpen && screen_width_check  ? 'open' : ''}`}>
                        {/* On desktop, :hover opens. On mobile, this toggles. */}
                        <button
                          type="button"
                          className={selected === item ? 'highlight': ''}
                          aria-expanded={isOpen ? 'true' : 'false'}
                          onClick={() => {
                            //toggleDropdown(item.id);
                            if(selected === item && screen_width_check){
                              setSelected(null);
                            }
                            else if (screen_width_check){
                              setSelected(item);
                            }
                            
                          }}
                        >
                          {item.label}
                        </button>
                        <ul className="dropdown-menu">
                          {item.children.map(sub => (
                            <li key={sub.id}>
                              
                              <Link href={sub.href} onClick={closeAll} className="link">{sub.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                    }
                    
                  })}
                </ul>
                <ul className={`dropdown-menu_mobile ${selected ? 'open' : ''}`}>
                          {selected &&selected.children.map(sub => (
                            <li key={sub.id}>
                              
                              <Link href={sub.href} onClick={closeAll} className="link">{sub.label}</Link>
                            </li>
                          ))}
                </ul>

                {!hideSignin && (
                  
                  <ul className=" header-nav-right">
                    
                    <li className="shopping_cart">
                      <Link href="/cart" onClick={closeAll} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="shopping_cart_link">
                          <path d="M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z" />
                        </svg>
                      
                      </Link>
                      <div className={product_in_cart_Context?.length > 0 ? 'box-show' : 'box-hide'}>
                          {product_in_cart_Context?.length ?? 0}
                      </div>
                    </li>
                    <li>
                      {profile_login_render()}
                    </li>
                  </ul>
                  
                )}
              </div>
            </nav>
          </div>
        
      </header>
    );
  }
