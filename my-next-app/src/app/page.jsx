import React from 'react';
import Hero from '../components/sections/Hero';
import Search_bar from '../components/sections/Search_bar';
import MultiWindowDisplay from '../components/sections/MultiWindowDisplay';
import Product_display from '../components/sections/Product_display';
import Brief from '../components/sections/Brief';
//import Carousel_new from '../components/elements/Carousel_new';
export default function Home() {
  return (
    <>
     
      <Hero />
      <MultiWindowDisplay />
      <Brief/>
      <Product_display/>
      
      {//<Carousel_new/>
      }
    </>
  );
}