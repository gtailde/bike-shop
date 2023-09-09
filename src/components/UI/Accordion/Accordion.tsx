import './style.scss';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as ArrowDownIcon } from './assets/arrow-down-icon.svg';

interface IAccordionContent {
  title: string;
  content: string;
}

export const Accordion = ({
  contents,
  className,
}: {
  contents: IAccordionContent[];
  className: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [height, setHeight] = useState(0);
  const activeContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeContentRef.current) {
      setHeight(activeContentRef.current.offsetHeight);
    }
  }, [height, activeIndex]);

  return (
    <div className={`accordion ${className ?? ''}`}>
      {contents.map(({ title, content }, index) => {
        if (activeIndex === index) {
          return (
            <div key={title} className="accordion__group accordion__group--expanded">
              <p className="accordion__group-title">
                {title}
                <ArrowDownIcon className="icon accordion__expand-icon" />
              </p>
              <div className="accordion__group-wrapper" style={{ height }}>
                <div className="accordion__group-content" ref={activeContentRef}>
                  {content}
                </div>
              </div>
            </div>
          );
        }
        return (
          <div key={title} className="accordion__group">
            <p className="accordion__group-title" onClick={() => setActiveIndex(index)}>
              {title}
              <ArrowDownIcon className="icon accordion__expand-icon" />
            </p>
            <div className="accordion__group-wrapper">
              <div className="accordion__group-content">{content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
