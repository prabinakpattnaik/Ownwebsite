// src/pages/HomePage.js
import React from 'react';
import { Box } from '@mui/material';
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
    <Box>
      <div id="home">
        <EnhancedHero />
      </div>
      <div id="highlights">
        <Highlights />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="ai-use-cases">
        <AIUseCases />
      </div>
      <div id="expertise">
        <DevExpertise />
      </div>
      <div id="success-metrics">
        <SuccessMetrics />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <div id="book-demo">
        <BookDemo />
      </div>
      <div id="newsletter">
        <Newsletter />
      </div>
      <Footer />
      <WhatsAppButton />
    </Box>
  );
}

export default HomePage;
