import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';

const propTypes = {
  active: PropTypes.bool,
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  active: false,
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

class Header extends React.Component {

  state = {
    isActive: false
  };

  nav = React.createRef();
  hamburger = React.createRef();

  componentDidMount() {
    this.props.active && this.openMenu();
    document.addEventListener('keydown', this.keyPress);
    document.addEventListener('click', this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyPress);
    document.addEventListener('click', this.clickOutside);
    this.closeMenu();
  }

  openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    this.nav.current.style.maxHeight = this.nav.current.scrollHeight + 'px';
    this.setState({ isActive: true });
  }

  closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    this.nav.current && (this.nav.current.style.maxHeight = null);
    this.setState({ isActive: false });
  }

  keyPress = (e) => {
    this.state.isActive && e.keyCode === 27 && this.closeMenu();
  }

  clickOutside = (e) => {
    if (!this.nav.current) return
    if (!this.state.isActive || this.nav.current.contains(e.target) || e.target === this.hamburger.current) return;
    this.closeMenu();
  }

  render() {
    const {
      className,
      active,
      navPosition,
      hideNav,
      hideSignin,
      bottomOuterDivider,
      bottomDivider,
      ...props
    } = this.props;

    const classes = classNames(
      'site-header',
      bottomOuterDivider && 'has-bottom-divider',
      className
    );

    return (
      <header
        {...props}
        className={classes}
      >
        <div className="container">
          <div className={
            classNames(
              'site-header-inner',
              bottomDivider && 'has-bottom-divider'
            )}>
            <Logo />
            <h3>BotBloc</h3>
            {!hideNav &&
              <React.Fragment>
                
                <button
                  ref={this.hamburger}
                  className="header-nav-toggle"
                  onClick={this.state.isActive ? this.closeMenu : this.openMenu}
                >
                  <span className="screen-reader">Menu</span>
                  <span className="hamburger">
                    <span className="hamburger-inner">5</span>
                  </span>
                </button>
                <nav
                  ref={this.nav}
                  className={
                    classNames(
                      'header-nav',
                      this.state.isActive && 'is-active'
                    )}>
                  <div className="header-nav-inner">
                    <ul className={
                      classNames(
                        'list-reset text-xs',
                        navPosition && `header-nav-${navPosition}`
                      )}>
                      <li>
                        <Link to="#hero-section" onClick={this.closeMenu}>Products</Link>
                      </li>
                      <li>
                        <Link to="#feature-section" onClick={this.closeMenu}>Solutions</Link>
                      </li>
                      <li>
                        <Link to="#roadmap-section" onClick={this.closeMenu}>Community</Link>
                      </li>
                      <li>
                        <Link to="#roadmap-section" onClick={this.closeMenu}>Contact</Link>
                      </li>
                    </ul>
                    {!hideSignin &&
                      <ul
                        className="list-reset header-nav-right"
                      >  
                        <li>
                          {/*<Link to="/signup" className="button button-primary button-wide-mobile button-sm" onClick={this.closeMenu}>Sign up</Link>*/}
                          

                          <a href="https://forms.office.com/Pages/DesignPageV2.aspx?subpage=design&FormId=paqCANYIyE-0gk-IxtBvPkDmIERVABVNmV8EVNvfaVFUOEwySFpKSjhYN1hMSjZDTVY3MEI0MkFRQS4u&Token=90c758245d7e4d038cfb1666e0540740"
                          className="button button-primary button-wide-mobile button-sm" target="_blank" >
                            Sign in
                          </a>
                        </li>
                      </ul>}
                      {!hideSignin &&
                      <ul
                        className="list-reset header-nav-right "
                      >  
                        <li>
                          {/*<Link to="/signup" className="button button-primary button-wide-mobile button-sm" onClick={this.closeMenu}>Sign up</Link>*/}
                          

                          <a href="https://forms.office.com/Pages/DesignPageV2.aspx?subpage=design&FormId=paqCANYIyE-0gk-IxtBvPkDmIERVABVNmV8EVNvfaVFUOEwySFpKSjhYN1hMSjZDTVY3MEI0MkFRQS4u&Token=90c758245d7e4d038cfb1666e0540740"
                          className="button button-primary button-wide-mobile button-sm button_2" target="_blank" >
                            Register
                          </a>
                        </li>
                      </ul>}
                  </div>
                </nav>
              </React.Fragment>}
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;