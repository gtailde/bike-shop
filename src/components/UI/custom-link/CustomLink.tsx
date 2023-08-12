import React, { type FC } from 'react';
import { Link } from 'react-router-dom';

interface CustomLinkProps {
  path: string;
  classNames: string[];
  textContent: string;
}

const CustomLink: FC<CustomLinkProps> = ({ path, classNames, textContent }) => {
  return (
    <Link to={path} className={'link ' + classNames.join(' ')}>
      {textContent}
    </Link>
  );
};

export default CustomLink;
