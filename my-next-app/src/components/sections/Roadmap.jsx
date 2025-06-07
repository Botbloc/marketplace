import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Timeline from '../elements/Timeline';
import TimelineItem from '../elements/TimelineItem';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class Roadmap extends React.Component {

  render() {

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'roadmap section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'roadmap-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const sectionHeader = {
      title: 'Product Roadmap',
      paragraph: 'This is our roadmap of product developments and major events, as well as projected schedules in the upcoming future.'
    };

    const timeLineItems =[
      {
        title : "Q2 2024",
        content: "Project Initiation"
      }
      ,{
        title : "Q4 2024",
        content: "First Prototype & Financing"
      }
      ,{
        title : "2025",
        content: "Pilot programs, Robot core and OS completion"
      }
      ,{
        title : "2026",
        content: "Developer partnership scheme"
      }
      ,{
        title : "2027",
        content: "Co-branded robots, Launch of marketplace and Trial release"
      }
      ,{
        title : "2028",
        content: "Mass release"
      }
      ,{
        title : "2029+",
        content: "Global expansion and continuous Development"
      }

      ]
    

    return (
      <section
        {...props}
        className={outerClasses}
        id = "roadmap-section"
      >
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <Timeline>
              {
                timeLineItems.map((item) => (
                  <TimelineItem title= {item.title} >
                    {item.content}
                  </TimelineItem>
                ))
              }
            </Timeline>
          </div>
        </div>
      </section>
    );
  }
}

Roadmap.propTypes = propTypes;
Roadmap.defaultProps = defaultProps;

export default Roadmap;