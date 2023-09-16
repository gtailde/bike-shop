import React, { useEffect } from 'react';
import { HeroSection } from 'components/blocks/HeroSection/HeroSection';
import { FirstBuyOffer } from 'components/blocks/FirstBuyOffer/FirstBuyOffer';
import { Promo } from 'components/blocks/Promo/Promo';
import { About } from '../../components/blocks/About/About';

export const Main = () => {
  useEffect(() => {
    document.querySelector('.page-header')?.classList.add('page-header--main-page');
    return () => document.querySelector('.page-header')?.classList.remove('page-header--main-page');
  }, []);
  return (
    <main className="page-content">
      <HeroSection />
      <FirstBuyOffer />
      <Promo />
      <About mode="short" />
    </main>
  );
};
