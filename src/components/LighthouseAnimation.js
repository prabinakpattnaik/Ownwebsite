// src/components/LighthouseAnimation.js
import React from 'react';
import './LighthouseAnimation.css';
import { ReactComponent as Lighthouse } from '../assets/lighthouse.svg';

function LighthouseAnimation() {
  return (
    <div className="lighthouse-container">
      <div className="light-beam"></div>
      <Lighthouse className="lighthouse-svg" aria-hidden="true" />
    </div>
  );
}

export default LighthouseAnimation;
