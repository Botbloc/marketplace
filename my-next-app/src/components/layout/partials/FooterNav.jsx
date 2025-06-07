'use client';
import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <a href="mailto:business@botbloc.com">Email: business@botbloc.com</a>
        </li>
        {/* 
        <li>
          <Link href="/contact/">Contact</Link>
        </li>
        <li>
          <Link href="/about-us/">About us</Link>
        </li>
        
        <li>
          <Link href="/faqs/">FAQ's</Link>
        </li>
        <li>
          <Link href="/support/">Support</Link>
        </li>*/}
      </ul>
    </nav>
  );
}

export default FooterNav;