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
                  { label: 'Terms of use', href: '/' },
                  { label: 'Privacy Policy', href: '/' },
                  { label: 'Cookies Policy', href: '/' }
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
                { label: 'R-Cores', href: '/' },
                { label: 'Actuators', href: '/' },
                { label: 'End effectors', href: '/' },
                { label: 'Sensors', href: '/' },
                { label: 'Applications', href: '/' },
                { label: 'Accessories', href: '/' },
                { label: 'Bundles', href: '/' }
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
                      { label: 'Use cases', href: '/' },
                      { label: 'Book a demo', href: '/' },
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
                    { label: 'Documentation', href: '/' },
                    { label: 'Learning', href: '/' },
                    { label: 'Community', href: '/' }
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
                  { label: 'About us', href: '/' },
                  { label: 'Press and release', href: '/' },
                  { label: 'Investors', href: '/' },
                  { label: 'Sustainability', href: '/' },
                  { label: 'Careers', href: '/' },
                  { label: 'Contact us', href: '/' }
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
