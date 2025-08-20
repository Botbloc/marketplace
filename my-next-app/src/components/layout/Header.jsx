  'use client';

  import React, { useContext, useEffect, useRef, useState } from 'react';
  import Link from 'next/link';
  import Logo from './partials/Logo';
  import cart_logic from '../../global_quantity/CartContext';
  import {useRouter} from "next/navigation";

  const NAV = [
    { id: 0, label: 'R-Cores', href: '/r-cores' },
    { id: 1, label: 'Components', href: '/' },
    { id: 2, label: 'Apps', href: '/' },
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

    return (
      <header ref={headerRef} className={headerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <Logo />

            {/* Hamburger (visible on mobile via CSS below) */}
            <button
              className="header-nav-toggle"
              aria-expanded={open ? 'true' : 'false'}
              aria-controls="site-nav"
              onClick={() => setOpen((v) => !v)}
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
                            router.push(item.href)} }>
                            {item.label}
                          </button>
                          
                        </li>
                      );
                    }
                    const isOpen = openDropdown === item.id;
                    return (
                      <li key={item.id} className={`dropdown ${isOpen ? 'open' : ''}`}>
                        {/* On desktop, :hover opens. On mobile, this toggles. */}
                        <button
                          type="button"
                          className="dropdown-toggle"
                          aria-expanded={isOpen ? 'true' : 'false'}
                          onClick={() => toggleDropdown(item.id)}
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
                  })}
                </ul>

                {!hideSignin && (
                  
                  <ul className=" header-nav-right">
                    <li>
                      <Link href="/login" onClick={closeAll} className="button_2">Sign in</Link>
                    </li>
                    <li className="shopping_cart">
                      <Link href="/cart" onClick={closeAll} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="shopping_cart_link">
                          <path d="M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z" />
                        </svg>
                      
                      </Link>
                      <div className={product_in_cart_Context?.length > 0 ? 'box-show' : 'box-hide'}>
                          
                          <span className="cart-count">{product_in_cart_Context?.length ?? 0}</span>
                      </div>
                    </li>
                  </ul>
                  
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
