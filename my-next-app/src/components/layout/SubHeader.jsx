'use client';

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import Logo from './partials/Logo';

const Header = ({
  className,
  active = false,
  navPosition = '',
  hideNav = false,
  hideSignin = false,
  bottomOuterDivider = false,
  bottomDivider = false,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    if (navRef.current) {
      navRef.current.style.maxHeight = navRef.current.scrollHeight + 'px';
    }
    setIsActive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    if (navRef.current) {
      navRef.current.style.maxHeight = null;
    }
    setIsActive(false);
  };

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

  useEffect(() => {
    if (active) openMenu();

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      closeMenu();
    };
  }, [active, isActive]);

  const navClasses = classNames('header-nav', isActive && 'is-active');

  return (
    <div {...props} className="subHeader">
      <div className="container">
        <div className="subHeader-inner">
          { (
            <>
              <button
                ref={hamburgerRef}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner">5</span>
                </span>
              </button>

              <nav ref={navRef} className={navClasses}>
                <div className="subHeader-nav-inner">
                  <ul
                    className={classNames(
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    {[
                      { id: 0,label: 'R-Cores', href: '/' },
                      {id: 1, label: 'Actuators', href: '/' },
                      {id: 2, label: 'End effectors', href: '/' },
                      {id: 3, label: 'Sensors', href: '/' }, 
                      {id: 4, label: 'Applications', href: '/' },
                      {id: 5, label: 'Accessories', href: '/' },
                      {id: 6, label: 'Shopping Cart', href: '/cart' }
                    ].map(({ id,label, href, className, subLabel }) => {  
                      if (className !== "dropdown"){
                        return(
                          <li key={id}>
                            <Link href={href} onClick={closeMenu}>
                              {label}
                            </Link>
                          </li>
                        )
                        
                      }
                      else{
                        return(
                          <li key={id} className='dropdown'>
                            {label}
                            <ul className="dropdown-menu">
                              
                              {subLabel.map(({id,label, href}) => (
                                <li key={id}>
                                  <Link href={href} onClick={closeMenu} className={className}>
                                    {label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        )
                      }
                      
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

Header.propTypes = {
  active: PropTypes.bool,
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
  className: PropTypes.string,
};

export default Header;
