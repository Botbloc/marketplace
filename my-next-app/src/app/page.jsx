import React from 'react';
import Hero from '../components/sections/Hero';
import Search_bar from '../components/sections/Search_bar';
import MultiWindowDisplay from '../components/sections/MultiWindowDisplay';
import ProductList from '../components/sections/ProductList';
import Brief from '../components/sections/Brief';
//import Carousel_new from '../components/elements/Carousel_new';
export default function Home() {
  return (
    <>
      <Search_bar />
      <Hero />
      <MultiWindowDisplay />
      <Brief/>
      <ProductList/>
      
      {//<Carousel_new/>
      }
    </>
  );
}