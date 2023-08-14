import React from 'react';
import { HeroSection } from 'components/blocks/HeroSection/HeroSection';
import { FirstBuyOffer } from 'components/blocks/FirstBuyOffer/FirstBuyOffer';
import { Promo } from 'components/blocks/Promo/Promo';
import { About } from '../../components/blocks/About/About';

export const Main = () => {
  return (
    <main className="page-content">
      <HeroSection />
      <FirstBuyOffer />
      <Promo />
      <About />
    </main>
  );
};
