'use client';

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import Logo from './partials/Logo';

const Header = ({ className = '', hideSignin = false, navPosition = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // mobile: which dropdown is open
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);


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

  const closeMenu = () => { // used after clicking any link: it collapses the mobile menu and any open dropdowns.
    setIsActive(false);
    setOpenDropdown(null); 
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

  const navClasses = classNames('subHeader-nav', isActive && 'is-active');

  return (
    <div className="subHeader">
      <div className="container">
        <div className="subHeader-inner">
          { (
            <>
              <button
                ref={hamburgerRef}
                className="header-nav-toggle"
                //onClick={isActive ? closeMenu : openMenu}
              >
                <span className="hamburger">
                </span>
              </button>

              <nav ref={navRef} className={navClasses}>
                <div className="subHeader-nav-inner">
                  <ul
                    className={classNames(
                      `subHeader-nav`
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
                            <Link href={href} onClick={closeMenu}>
                              {label}
                            </Link>
                          </li>
                        )
                        
                      
                      
                    })}
                  </ul>
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


export default Header;
