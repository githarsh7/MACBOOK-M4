import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Highlight from './components/Highlight'
import Showcase from './components/Showcase'
import Footer from './components/Footer'
import Lenis from 'lenis'

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

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
