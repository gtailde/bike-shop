import { About } from 'components/blocks/About/About';
import React, { useEffect } from 'react';

export const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <main className="page-content">
      <h1 className="visually-hidden">About us page</h1>
      <About mode="full" />
    </main>
  );
};
