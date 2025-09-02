'use client';

import React, { useState, useEffect, useRef, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const swipeThreshold = 40;

const Carousel = ({
  children,
  active = 0,
  autorotate = false,
  autorotateTiming = 7000,
  className,
  ...props
}) => {
  const [activeItem, setActiveItem] = useState(active);
  const [items, setItems] = useState([]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [autorotateInterval, setAutorotateInterval] = useState(null);
  const carousel = useRef(null);

  const goTo = (n, stop = false) => {
    if (stop) stopAutorotate();
    setActiveItem(n);
  };

  const goToNext = (stop = false) => {
    const nextItem = (activeItem + 1 >= Children.count(children)) ? 0 : activeItem + 1;
    goTo(nextItem, stop);
  };

  const goToPrev = (stop = false) => {
    const prevItem = (activeItem - 1 < 0) ? Children.count(children) - 1 : activeItem - 1;
    goTo(prevItem, stop);
  };

  const playAutorotate = () => {
    if (!autorotateInterval && autorotate) {
      const interval = setInterval(goToNext, autorotateTiming);
      setAutorotateInterval(interval);
    }
  };

  const stopAutorotate = () => {
    clearInterval(autorotateInterval);
    setAutorotateInterval(null);
  };

  const heightFix = () => {
    let taller = 0;
    items.forEach((item) => {
      item.classList.add('is-loading');
      const height = item.offsetHeight;
      item.classList.remove('is-loading');
      if (height > taller) taller = height;
    });
    if (carousel.current) {
      carousel.current.style.minHeight = `${taller}px`;
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) < swipeThreshold) return;
    diff < 0 ? goToNext(true) : goToPrev(true);
  };

  useEffect(() => {
    if (carousel.current) {
      setItems(Array.from(carousel.current.childNodes));
    }
  }, []);

  useEffect(() => {
    heightFix();
    playAutorotate();
    window.addEventListener('resize', heightFix);
    return () => {
      window.removeEventListener('resize', heightFix);
      stopAutorotate();
    };
  }, [items]);

  const classes = classNames('carousel-items', className);

  return (
    <>
      <div
        {...props}
        ref={carousel}
        className={classes}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {Children.map(children, (child, n) =>
          cloneElement(child, {
            key: n,
            className: classNames(child.props.className, activeItem === n && 'is-active')
          })
        )}
      </div>
      <div className="carousel-bullets">
        {Children.map(children, (child, n) => (
          <button
            key={n}
            className={classNames('carousel-bullet', activeItem === n && 'is-active')}
            onClick={() => goTo(n, true)}
          />
        ))}
      </div>
    </>
  );
};

Carousel.propTypes = {
  children: PropTypes.node,
  active: PropTypes.number,
  autorotate: PropTypes.bool,
  autorotateTiming: PropTypes.number,
  className: PropTypes.string,
};

export default Carousel;
