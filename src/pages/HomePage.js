// src/pages/HomePage.js
import React from 'react';
import EnhancedHero from '../components/EnhancedHero';
import Highlights from '../components/Highlights';
import About from '../components/About';
import AIUseCases from '../components/AIUseCases';
import DevExpertise from '../components/DevExpertise';
import SuccessMetrics from '../components/SuccessMetrics';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';
import BookDemo from '../components/BookDemo';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

function HomePage() {
  return (
    <div>
      <EnhancedHero />
      <Highlights />
      <About />
      <AIUseCases />
      <DevExpertise />
      <SuccessMetrics />
      <Testimonials />
      <ContactForm />
      <BookDemo />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default HomePage;
