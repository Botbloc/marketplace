import React from 'react';
import Hero from '../components/sections/Hero';
import Search_bar from '../components/sections/Search_bar';
import MultiWindowDisplay from '../components/sections/MultiWindowDisplay';
import ProductList from ''

export default function Home() {
  return (
    <>
      <Search_bar />
      <Hero />
      <MultiWindowDisplay />
      <ProductList/>
    </>
  );
}