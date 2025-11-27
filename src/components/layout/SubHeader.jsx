'use client';

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from './partials/Logo';

const SubHeader = ({ value, onChange, fnc, clearAll }) => {
  const [isActive, setIsActive] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // mobile: which dropdown is open
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const router = useRouter();

  const handleEscape = (e) => e.key === 'Escape' && isActive && closeMenu();

  const handleClickOutside = (e) => {
    if (
      !isActive ||
      navRef.current?.contains(e.target) ||
      hamburgerRef.current === e.target
    )
      return;
    closeMenu();
  };

  const handleNavClick = (href) => (e) => {
    e.preventDefault();      // stop immediate navigation
    closeMenu();             // start animation
    setTimeout(() => {
      router.push(href);     // navigate after animation finishes
    }, 250);                 // match opacity/transform duration
  };


  

  const closeMenu = () => { // used after clicking any link: it collapses the mobile menu and any open dropdowns.
    setIsActive(false);
    setOpenDropdown(null); 
  };
  
  const openMenu = () => {
    setIsActive(true);
    setOpenDropdown(true);

  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      closeMenu();
    };
  }, []);


  //const navClasses = classNames('subHeader-nav', isActive && 'is-active');

  return (
    <div className="subHeader">
      
        <div className="subHeader-inner">
          { (
            <>
              <button
                ref={hamburgerRef}
                className="subHeader-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="hamburger">
                </span>
              </button>

              <nav ref={navRef}>
                <div className="subHeader-nav-inner">
                  <ul
                    className={classNames(
                      `subHeader-nav`, openDropdown? "open": ""
                    )}
                  >
                    {[
                      { id: 0,label: 'R-Cores', href: '/' },
                      {id: 1, label: 'Actuators', href: '/' },
                      {id: 2, label: 'End effectors', href: '/' },
                      {id: 3, label: 'Sensors', href: '/' }, 
                      {id: 4, label: 'Applications', href: '/' },
                      {id: 5, label: 'Accessories', href: '/' }
                    ].map(({ id,label, href, className, subLabel }) => {  
                      
                        return(
                          <li key={id}>
                            <button onClick={ v => onChange({ category: label || undefined })}>
                              {label}
                            </button>
                          </li>
                        )
                    })}
                  </ul>
                  
                </div>
              </nav>
            </>
          )}
          <div className='filter_module'>
            <button onClick={fnc} className='filter_btn'>
              <svg viewBox="0 0 24 24" focusable="false" width="24" height="24" data-skapa="ssr-icon@11.1.0" aria-hidden="true" class="plp-svg-icon plp-pill__trailing-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 5h2v1h12v2H8v1H6V8H4V6h2V5zm12 8h2v-2h-2v-1h-2v1H4v2h12v1h2v-1zm-5.9392 5H20v-2h-7.9392v-1h-2v1H4v2h6.0608v1h2v-1z"></path></svg>
            </button>
            <button onClick={() => clearAll()} className='clear_btn'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
                </svg>
            </button>
          </div>
          
        </div>
      
    </div>
  );
};


export default SubHeader;
