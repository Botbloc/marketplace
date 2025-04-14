import React from 'react';
import HeroSplit from '../components/sections/HeroSplit';
import Hero from '../components/sections/Hero';
import Search_bar from '../components/sections/Search_bar';
import MultiWindowDisplay from '../components/sections/MultiWindowDisplay';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Search_bar/>
        <Hero/>
        <MultiWindowDisplay/>
      </React.Fragment>
    );
  }
}

export default Home;