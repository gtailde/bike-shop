import React from 'react';
import './style.scss';
import { ReactComponent as GithubIcon } from './assets/github-icon.svg';
import { ReactComponent as RSSIcon } from './assets/rss-icon.svg';
import { ReactComponent as FreepikIcon } from './assets/freepik-icon.svg';

export const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="page-footer__content page-wrapper">
        <div className="page-footer__github-links">
          <a href="https://github.com/gtailde" data-title="Олежа" target="_blank">
            <GithubIcon />
          </a>
          <a href="https://github.com/Firebrand-RS" data-title="Димон" target="_blank">
            <GithubIcon />
          </a>
          <a href="https://github.com/Radzivonn" data-title="Родион" target="_blank">
            <GithubIcon />
          </a>
        </div>
        <div className="page-footer__resource-links">
          <a href="https://rs.school/js/" target="_blank">
            <RSSIcon />
          </a>
          <a href="https://www.freepik.com/" target="_blank">
            <FreepikIcon />
          </a>
        </div>
        <p className="page-footer__year"> 2023 </p>
      </div>
    </footer>
  );
};
