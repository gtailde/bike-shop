import './style.scss';
import React from 'react';
import { AccentButton } from 'components/UI/buttons/accent-button/AccentButton';
import { pagePathnames } from 'router/pagePathnames';
import { useNavigate } from 'react-router-dom';

export function FirstBuyOffer() {
  const navigate = useNavigate();
  const handleGoShop = () => {
    navigate(pagePathnames.catalog);
  };

  return (
    <section className="first-buy-offer">
      <h2 className="visually-hidden">Special offer</h2>
      <div className="first-buy-offer__container page-wrapper">
        <p className="first-buy-offer__title first-buy-offer__title--decorative">30% Off</p>
        <p className="first-buy-offer__title">For Your First Shopping</p>
        <p className="first-buy-offer__lead">Lifestyle bicycle</p>
        <p className="first-buy-offer__description">
          Bike riding is an excellent cardio workout. It can helpboost your heart and lung health,
          improve your bloodflow, build muscle strength, and lower your stresslevels. On top of
          that, it can also help you burn fat, torch calories, and lose weight.
        </p>
        <AccentButton onClick={handleGoShop}>Shop Now</AccentButton>
      </div>
    </section>
  );
}
