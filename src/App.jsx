import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Highlight from './components/Highlight'
import Showcase from './components/Showcase'
import Footer from './components/Footer'

import Lenis from 'lenis'

const App = () => {

const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Highlight/>
      <Showcase/>
      <Footer/> 
    </div>
  )
}

export default App
