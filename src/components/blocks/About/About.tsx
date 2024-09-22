import './style.scss';
import React from 'react';
import { type IContributor } from './types';
import { Contributor } from './Contributor';
import { Button } from 'components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import contributor1 from './assets/507159169e041129e1cfa2df02ca7083.png';
import contributor2 from './assets/83f55be2ec7e698fc3859f58ddcaa02b.png';
import contributor3 from './assets/daa12b4876966e09bda37bc5f5b28771.png';

const contributorsList: IContributor[] = [
  {
    image: contributor1,
    name: 'Lorem Ipsum',
    role: 'Lorem Ipsum',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
    been the industr`,
  },
  {
    image: contributor2,
    name: 'Lorem Ipsum',
    role: 'Lorem Ipsum',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
    been the industr`,
  },
  {
    image: contributor3,
    name: 'Lorem Ipsum',
    role: 'Lorem Ipsum',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
    been the industr`,
  },
];

export const About = () => {
  const navigate = useNavigate();
  const handleShowMore = () => {
    navigate(pagePathnames.about);
  };

  return (
    <section className="about">
      <div className="about__container page-wrapper">
        <h2 className="about__title">Our Team</h2>
        <p className="about__description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type and scrambled it to make a type specimen book.
        </p>
        <ul className="about__contributors-list">
          {contributorsList.map((data, index) => (
            <li className="about__contributors-item" key={index}>
              <Contributor {...data} />
            </li>
          ))}
        </ul>
        <Button accent onClick={handleShowMore}>
          More about us
        </Button>
      </div>
    </section>
  );
};
