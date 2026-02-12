// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import AdminPanel from './pages/AdminPanel';

// Components
import AppAppBar from './components/AppBar';

import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
          <ScrollToTop />
          <div className="App">
            <AppAppBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
