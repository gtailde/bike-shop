import React, { type FC, useEffect, useRef, useState } from 'react';
import { FilterGroup } from '../FilterGroup/FilterGroup';
import { type IFilterRangeSlider, type IFilterOption } from '../types';
import { type IFilters } from 'types/types';

interface IFilterGroupProps {
  rangeSliders: IFilterRangeSlider[];
  controlGroups: IFilterOption[];
  filterSettings: IFilters;
  onChange: (data: IFilters) => void;
}

export const FilterAccordion: FC<IFilterGroupProps> = ({
  rangeSliders,
  controlGroups,
  filterSettings,
  onChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [groupHeight, setGroupHeight] = useState(0);
  const activeContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeContentRef.current) {
      setGroupHeight(activeContentRef.current.offsetHeight);
    }
  }, [groupHeight, activeIndex]);

  return (
    <div className="filter__accordion">
      {[...rangeSliders, ...controlGroups].map((group, index) =>
        activeIndex === index ? (
          <FilterGroup
            {...group}
            key={group.title}
            ref={activeContentRef}
            height={groupHeight}
            isExpand={true}
            filterSettings={filterSettings}
            onChange={onChange}
          />
        ) : (
          <FilterGroup
            {...group}
            key={group.title}
            filterSettings={filterSettings}
            onSelect={() => {
              setActiveIndex(index);
            }}
            onChange={onChange}
          />
        ),
      )}
    </div>
  );
};
