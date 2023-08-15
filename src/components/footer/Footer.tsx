import React from 'react';
import './style.scss';
import githubIcon from './assets/github-icon.svg';
import RSSIcon from './assets/rss-icon.svg';
import freepikIcon from './assets/freepik-icon.svg';

export const Footer = () => {
  return (
    <footer>
      <div className="github-links">
        <a href="https://github.com/gtailde" data-title="Олежа" target="_blank">
          <img src={githubIcon} alt="github-icon" />
        </a>
        <a href="https://github.com/Firebrand-RS" data-title="Димон" target="_blank">
          <img src={githubIcon} alt="github-icon" />
        </a>
        <a href="https://github.com/Radzivonn" data-title="Родион" target="_blank">
          <img src={githubIcon} alt="github-icon" />
        </a>
      </div>
      <div className="resource-links">
        <a href="https://rs.school/js/" target="_blank">
          <img src={RSSIcon} alt="rss-icon" />
        </a>
        <a href="https://www.freepik.com/" target="_blank">
          <img src={freepikIcon} alt="freepik-icon" />
        </a>
      </div>
      <p className="year"> 2023 </p>
    </footer>
  );
};
