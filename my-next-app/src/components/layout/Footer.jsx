'use client';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Logo from './partials/Logo';
import FooterNav from './partials/FooterNav';
import FooterSocial from './partials/FooterSocial';

const Footer = ({
  className,
  topOuterDivider,
  topDivider,
  ...props
}) => {
  const classes = classNames(
    'site-footer invert-color center-content-mobile',
    topOuterDivider && 'has-top-divider',
    className
  );

  return (
    <footer {...props} className={classes}>
      <div className="container">
        <div
          className={classNames(
            'site-footer-inner',
            topDivider && 'has-top-divider'
          )}
        >
          <div className="footer-top space-between text-xxs">
            <Logo />
            <FooterSocial />
          </div>
          <div className="footer-bottom space-between text-xxs invert-order-desktop">
            <FooterNav />
            <div className="footer-copyright">
              &copy; 2024 BotBloc, all rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  topOuterDivider: PropTypes.bool,
  topDivider: PropTypes.bool,
};

Footer.defaultProps = {
  topOuterDivider: false,
  topDivider: false,
};

export default Footer;
