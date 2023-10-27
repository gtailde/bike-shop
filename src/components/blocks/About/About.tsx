import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { CONTRIBUTOR_LIST, TEAM_DESCRIPTION } from './const';
import { ReactComponent as GithubIcon } from './assets/github-icon.svg';

export const About = ({ mode }: { mode: 'short' | 'full' }) => {
  if (mode === 'short') {
    return (
      <section className="about-us about-us--short">
        <div className="about-us__content page-wrapper">
          <h2 className="about-us__title">Our Team</h2>
          <ul className="about-us__contributors-list">
            {CONTRIBUTOR_LIST.map(
              ({ image, name, role, contribution, githubNickname, githubLink }, index) => (
                <li className="about-us__contributors-item" key={index}>
                  <div className="contributor">
                    <div className="contributor__image-container">
                      <img className="contributor__image" src={image} alt="contributor" />
                    </div>
                    <p className="contributor__name">{name}</p>
                    <p className="contributor__role">{role}</p>
                    <ul className="contributor__contributions">
                      {contribution.map((subitem, subindex) => (
                        <li key={subindex} className="contributor__contribution">
                          {subitem}
                        </li>
                      ))}
                    </ul>
                    <div className="contributor__github-overlay">
                      <a href={githubLink} target="_blank">
                        <GithubIcon />
                        <span className="contributor__nickname">{githubNickname}</span>
                      </a>
                    </div>
                  </div>
                </li>
              ),
            )}
          </ul>
          <Link to={pagePathnames.about} className="link link--button-like link--accent">
            More about us
          </Link>
        </div>
      </section>
    );
  } else if (mode === 'full') {
    return (
      <section className="about-us about-us--full">
        <div className="about-us__content page-wrapper">
          <h2 className="about-us__title">About us</h2>
          <ul className="about-us__description-list">
            {TEAM_DESCRIPTION.map(({ title, description, id }) => (
              <li key={id} className="about-us__description-item">
                <h3 className="about-us__description-title">{title}</h3>
                <p className="about-us__description-text">{description}</p>
              </li>
            ))}
          </ul>
          <ul className="about-us__contributors">
            {CONTRIBUTOR_LIST.map(
              ({ image, name, role, contribution, bio, id, githubLink, githubNickname }) => (
                <li key={id} className="about-us__contributor">
                  <div className="contributor">
                    <div className="contributor__image-container">
                      <img className="contributor__image" src={image} alt="person" />
                    </div>
                    <div className="contributor__description">
                      <div className="contributor__heading">
                        <p className="contributor__name">{name}</p>
                        <p className="contributor__role">{role}</p>
                      </div>
                      <ul className="contributor__contributions">
                        {contribution.map((subitem, subindex) => (
                          <li key={subindex} className="contributor__contribution">
                            {subitem}
                          </li>
                        ))}
                      </ul>
                      <div className="contributor__bio">
                        {bio.map((subitem, subindex) => (
                          <p key={subindex} className="contributor__bio-paragraph">
                            {subitem}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="contributor__github-overlay">
                      <a href={githubLink} target="_blank">
                        <GithubIcon />
                        <span className="contributor__nickname">{githubNickname}</span>
                      </a>
                    </div>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
    );
  }
};
