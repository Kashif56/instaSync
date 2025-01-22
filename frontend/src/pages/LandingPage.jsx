import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import Features from '../components/Features';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
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