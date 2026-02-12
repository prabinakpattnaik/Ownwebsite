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

import RevealOnScroll from '../components/RevealOnScroll';

function HomePage() {
  return (
    <Box>
      <div id="home">
        <EnhancedHero />
      </div>

      <div id="highlights">
        <RevealOnScroll delay={200}>
          <Highlights />
        </RevealOnScroll>
      </div>

      <div id="about">
        <RevealOnScroll>
          <About />
        </RevealOnScroll>
      </div>

      <div id="ai-use-cases">
        <RevealOnScroll>
          <AIUseCases />
        </RevealOnScroll>
      </div>

      <div id="expertise">
        <RevealOnScroll>
          <DevExpertise />
        </RevealOnScroll>
      </div>

      <div id="success-metrics">
        <RevealOnScroll>
          <SuccessMetrics />
        </RevealOnScroll>
      </div>

      <div id="testimonials">
        <RevealOnScroll>
          <Testimonials />
        </RevealOnScroll>
      </div>

      <div id="contact">
        <RevealOnScroll>
          <ContactForm />
        </RevealOnScroll>
      </div>

      <div id="book-demo">
        <RevealOnScroll>
          <BookDemo />
        </RevealOnScroll>
      </div>

      <div id="newsletter">
        <RevealOnScroll>
          <Newsletter />
        </RevealOnScroll>
      </div>

      <Footer />
      <WhatsAppButton />
    </Box>
  );
}

export default HomePage;
