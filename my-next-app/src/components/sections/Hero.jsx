"use client";
import { useEffect, useRef } from "react";
import test_img from "../../assets/images/test_image.png";

const Hero = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  //const lenis = useLenis(); // 👈 get Lenis instance from context

  const heading = "Join the BotBloc community here";
  const subHeading = "Customised solution of robots tailored to your needs";

  useEffect(() => {
    // fade-in on mount
    const t = setTimeout(() => innerRef.current?.classList.add("is-visible"), 30);

    //if (!outerRef.current || !lenis) return;

    const hero = outerRef.current;

    const onScroll = () => {
      const scroll = window.scrollY;
      const rect = hero.getBoundingClientRect();
      const heroH = rect.height || 1;

      // progress 0 → 1 while scrolling through the hero
      const heroTop = scroll + rect.top;
      const progress = Math.min(Math.max((scroll - heroTop) / heroH, 0), 1);

      // shrink factor
      const shrink = progress;

      // parallax: slower than content
      const speed = 0.7; // adjust 0.3–0.6 to taste
      const parallaxPx = rect.top * speed;

      hero.style.setProperty("--hero-parallax", `${-parallaxPx}px`);
      hero.style.setProperty("--hero-shrink", String(shrink));
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="wrapper">
      <div ref={outerRef} className="Hero_bar_section">
        <img src={test_img.src} className="background" alt="Hero background" />
        <div ref={innerRef} className="hero_bar_inner">
          <h2 className="heading">{heading}</h2>
          <h5 className="subHeading">{subHeading}</h5>
        </div>
      </div>
    </div>
  );
};

export default Hero;
