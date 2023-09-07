export interface IFilterList {
  title: string;
  list?: string[];
}

export interface IFilterRangeSlider {
  title: string;
  rangeValues: {
    minLimit: number;
    maxLimit: number;
  };
}

export interface IProductData {
  id: string;
  titleImage: string;
  images: string[];
  name: string;
  description: string;
  specification: string;
  oldPrice: number;
  newPrice: number;
}
