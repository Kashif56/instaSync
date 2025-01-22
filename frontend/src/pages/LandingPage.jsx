import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/LandingPage/Hero';
import WhyUs from '../components/LandingPage/WhyUs';
import Features from '../components/LandingPage/Features';
import Clients from '../components/LandingPage/Clients';
import Testimonials from '../components/LandingPage/Testimonials';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <WhyUs />
        <Features />
        <Clients />
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;