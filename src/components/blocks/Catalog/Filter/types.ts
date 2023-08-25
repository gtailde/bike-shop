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
  id: number;
  titleImage: string;
  images: string[];
  name: string;
  description: string;
  specification: Record<string, string>;
  oldPrice: number;
  newPrice: number;
}
