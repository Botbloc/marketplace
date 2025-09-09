'use client';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {useState} from 'react';

import Logo from './partials/Logo';
import FooterNav from './partials/FooterNav';
import FooterSocial from './partials/FooterSocial';
import Link from 'next/link';

const Footer = () => {
  const [openShop, setOpenShop] = useState(false);
  const [business, setBusiness] = useState(false);
  const [developers, setDevelopers] = useState(false);
  const [about, setAbout] = useState(false);

  return (
    <div className='site-footer'>
      <div className='division_bar'></div>
      <footer className="site-footer-inner">
         
          <div className='footer-social'>
                <FooterSocial />
                <copy>Copyright @ 2025 BotBloc Ltd.<br/> All rights reserved</copy>
                <ul className='terms_and_condition'>
                {[
                  { label: 'Terms of use', href: '/a' },
                  { label: 'Privacy Policy', href: '/a' },
                  { label: 'Cookies Policy', href: '/a' }
                ].map(({ label, href }) => (  
                  <li key={label}>
                    <Link href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            
          </div>
          <div 
            className={`footer-shop ${openShop?"open":""}`} 
           > 
            <h6  onClick={(e)=>{
              openShop? setOpenShop(false): setOpenShop(true);
            }}>Shop</h6>
            <ul>
              {[
                { label: 'R-Cores', href: '/a' },
                { label: 'Actuators', href: '/a' },
                { label: 'End effectors', href: '/a' },
                { label: 'Sensors', href: '/a' },
                { label: 'Applications', href: '/a' },
                { label: 'Accessories', href: '/a' },
                { label: 'Bundles', href: '/a' }
              ].map(({ label, href }) => (  
                <li key={label}>
                  <Link href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>
          <div >
                <div className={`footer-business ${business?"open": ""}`}
                  
                >
                  <h6 onClick={(e)=>{
                  business? setBusiness(false): setBusiness(true);
                  }}>Businesses</h6>
                  <ul>
                    {[
                      { label: 'Use cases', href: '/uses_cases' },
                      { label: 'Book a demo', href: '/book-a-demo' },
                    ].map(({ label, href }) => (  
                      <li key={label}>
                        <Link href={href}>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
              </div>
              <div className={`footer-dev ${developers?"open": ""}`}
                
                >
                <h6 onClick={(e)=>{
                    developers? setDevelopers(false): setDevelopers(true);
                  }}>Developers</h6>
                <ul>
                  {[
                    { label: 'Documentation', href: '/Docs' },
                    { label: 'Learning', href: '/learning' },
                    { label: 'Community', href: '/community' },
                    { label: 'Selling with us', href: '/selling-with-us' }
                  ].map(({ label, href }) => (  
                    <li key={label}>
                      <Link href={href}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
          <div className={`footer-about ${about? "open": ""}`}>
            <h6 onClick={(e)=>{
                about? setAbout(false): setAbout(true);
              }}>About</h6>
              <ul>
                {[
                  { label: 'About us', href: '/about' },
                  { label: 'Press and release', href: '/press_and_release' },
                  { label: 'Investors', href: '/investors' },
                  { label: 'Sustainability', href: '/sustainability' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Contact us', href: '/contact_us' }
                ].map(({ label, href }) => (  
                  <li key={label}>
                    <Link href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
          </div>
        
      </footer>
    </div>
  );
};


export default Footer;
