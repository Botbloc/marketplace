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

  const headerClasses = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );

  const innerClasses = classNames(
    'site-header-inner',
    bottomDivider && 'has-bottom-divider'
  );

  const navClasses = classNames('header-nav', isActive && 'is-active');

  // for signin buttons:
  //href="https://forms.office.com/Pages/DesignPageV2.aspx?subpage=design&FormId=paqCANYIyE-0gk-IxtBvPkDmIERVABVNmV8EVNvfaVFUOEwySFpKSjhYN1hMSjZDTVY3MEI0MkFRQS4u&Token=90c758245d7e4d038cfb1666e0540740"

  // for register button:
  //href="https://forms.office.com/Pages/DesignPageV2.aspx?subpage=design&FormId=paqCANYIyE-0gk-IxtBvPkDmIERVABVNmV8EVNvfaVFUOEwySFpKSjhYN1hMSjZDTVY3MEI0MkFRQS4u&Token=90c758245d7e4d038cfb1666e0540740"
  return (
    <header {...props} className={headerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <Logo />
          

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
                <div className="header-nav-inner">
                  <ul
                    className={classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    {[
                      { id: 0,label: 'R-Cores', href: '/' },
                      {id: 1, label: 'Components', href: '/' },
                      {id: 2, label: 'Apps', href: '/' },
                      {id: 3, label: 'Business',  subLabel: [
                          {id: 0, label: 'Uses cases', href: '/uses_cases'},
                          {id: 1, label: 'Book a demo', href: '/book_demo'}, 
                      ] , className : "dropdown" },
                      {id: 4, label: 'Developers', subLabel: [
                          {id: 0, label: 'Documentation', href: '/Docs'},
                          {id: 1, label: 'Learning', href: '/learning'}, 
                          {id: 2, label: 'Community', href: '/community'}
                      ]  ,className : "dropdown" },
                      {id: 5, label: 'About',  subLabel: [
                          {id: 0, label: 'About us', href: '/abt_us'},
                          {id: 1, label: 'Press and release', href: '/press_and_release'}, 
                          {id: 2,label: 'Investors', href: '/investors'},
                          {id: 3, label: 'sustainability', href: '/sustainability'},
                          {id: 4, label: 'careers', href: '/careers'},
                          {id: 5, label: 'contact us', href: '/contact_us'}
                      ] ,className : "dropdown"},
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

                  {!hideSignin && (
                    <ul className="list-reset header-nav-right">
                      <li>                        
                        <Link href="login" onClick={closeMenu} className="button_2">
                          Sign in
                          
                        </Link>

                      </li>
                      
                    </ul>
                  )}
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
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
