import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import Icon_modular from "./../../assets/images/module-svgrepo-com (1).svg";
import Ai_icon from "./../../assets/images/ai_icon.svg";
import customisation_icon from "./../../assets/images/customisation_icon.svg";
import marketplace_icon from "./../../assets/images/store_icon.svg";
import program_icon from "./../../assets/images/program_icon.svg";
import robot_core_icon from "./../../assets/images/robot_2_icon.svg";
import Icon1 from "./../../assets/images/icon-modular.svg"
const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

class FeaturesTiles extends React.Component {

  render() {

    

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      pushLeft,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'features-tiles section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'features-tiles-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
      'tiles-wrap',
      pushLeft && 'push-left'
    );

    const sectionHeader = {
      title: '',
      paragraph: ''
    };

    return (
      <section
        {...props}
        className={outerClasses}
        id="feature-section"
      >
        <div  className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <div className={tilesClasses}>

              <div className="tiles-item reveal-from-bottom" data-reveal-container=".tiles-wrap">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16">
                    <Image
                        /*className = ""*/
                        src={Icon_modular}
                        alt="Features tile icon 01"
                        width={32}
                        height={32} />
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      Modular design
                    </h4>
                    <p className="m-0 text-sm">
                      Structured with different individual parts and modules, our robot is a platform adapting to any extensions for fast assembling and integration of functionalities 
                        of one needed
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-from-bottom" data-reveal-container=".tiles-wrap" data-reveal-delay="100">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16">


                      <Image
                        src={robot_core_icon}
                        alt="Features tile icon 02"
                        width={32}
                        height={32} />
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      Universal Robot Core
                    </h4>
                    <p className="m-0 text-sm">
                    Our Universal Robot Core is the heart of every BotBloc creation. With a powerful computing module and flexible mounting points, the core allows users to add custom hardware like arms, wheels, and cameras. Whether you're building a robot for manufacturing or household chores, this core scales with your needs, offering endless possibilities at an affordable price.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-from-bottom" data-reveal-container=".tiles-wrap" data-reveal-delay="200">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16">
                      <Image
                        src={Ai_icon}
                        alt="Features tile icon 03"
                        width={32}
                        height={32} />
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      Learning your daily patterns
                    </h4>
                    <p className="m-0 text-sm">
                      The use of machine learning empowers our product to have a better insight of your daily working pattern, for both industrial and individual use,
                        making your life easier.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-from-bottom" data-reveal-container=".tiles-wrap" data-reveal-delay="300">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16">
                      <Image
                        src={customisation_icon}
                        alt="Features tile icon 04"
                        width={32}
                        height={32} />
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      Customisation 
                    </h4>
                    <p className="m-0 text-sm">
                      Amid a wide range of functionalities, 
                        you can choose what you want and we will take care of how they should be integrated together to work with your expectations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-from-bottom" data-reveal-container=".tiles-wrap" data-reveal-delay="400">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16">
                      <Image
                        src={program_icon}
                        alt="Features tile icon 05"
                        width={32}
                        height={32} />
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      Having your own program onboard
                    </h4>
                    <p className="m-0 text-sm">
                      In case you want to have something developed by you running on our robot, we have different protocols specialised for this to work well on it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-from-bottom" data-reveal-container=".tiles-wrap" data-reveal-delay="500">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    <div className="features-tiles-item-image mb-16">
                      <Image
                        src={marketplace_icon}
                        alt="Features tile icon 06"
                        width={32}
                        height={32} />
                    </div>
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      Robot marketplace
                    </h4>
                    <p className="m-0 text-sm">
                      Our ambition does not stop with developing a single product, 
                      but to build up an ecosystem for the love of robots designed to satisfy your needs with various modules on the carousel.
                    </p>
                  </div>
                </div>
              </div>              

            </div>
          </div>
        </div>
      </section>
    );
  }
}

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;