import './style.scss';
import React, { type FC, useEffect, useState } from 'react';
import { type ICategory } from 'types/types';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { CategorySlider } from '../CategorySlider/CategorySlider';
import productAPI from 'API/ProductAPI';
import { type CategoryName } from 'components/blocks/Catalog/Filter/types';

const ROOT: ICategory = {
  id: 'd25845ae-547e-4f77-9637-bd16255bf874',
  createdAt: '',
  createdBy: {
    user: {
      id: 'string',
      typeId: 'string',
    },
    isPlatformClient: false,
  },
  key: 'Shop',
  lastMessageSequenceNumber: 1,
  lastModifiedAt: '',
  lastModifiedBy: {
    user: {
      id: 'string',
      typeId: 'string',
    },
    isPlatformClient: false,
  },
  name: {
    'en-US': 'Shop',
  },
  description: { 'en-US': 'Shop' },
  ancestors: [],
  orderHint: '0',
  slug: { 'en-US': 'Shop' },
  version: 3,
  versionModifiedAt: '',
  assets: [''],
};

interface CategoryNavigatorProps {
  onSelect: (data: ICategory, categoryName?: CategoryName) => void;
}

export const CategoryNavigator: FC<CategoryNavigatorProps> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(ROOT);
  const [fetchedCategoryList, setFetchedCategoryList] = useState<ICategory[]>([]);
  const [subcategoryList, setSubcategoryList] = useState<ICategory[]>([]);
  const [categoryName, setCategoryName] = useState<CategoryName>();

  useEffect(() => {
    void fetchCategoryList();
  }, []);

  useEffect(() => {
    const hasChildren = fetchedCategoryList.some(
      (category) => category.parent?.id === selectedCategory?.id,
    );
    if (hasChildren) {
      const subcategories = getSubcategoryList(selectedCategory);
      setSubcategoryList(subcategories);
      const parentCategoryName = selectedCategory.slug['en-US'];
      setCategoryName(
        parentCategoryName === 'bikes'
          ? 'category'
          : parentCategoryName === 'brand'
          ? parentCategoryName
          : undefined,
      );
    }
  }, [fetchedCategoryList, selectedCategory]);

  const fetchCategoryList = async () => {
    const response = await productAPI.getCategories();
    const categoriesList: ICategory[] = response.results;
    setFetchedCategoryList(categoriesList);
  };

  const getSubcategoryList = (parentCategory: ICategory | undefined) => {
    if (parentCategory === ROOT) {
      return fetchedCategoryList.filter((category) => !category.parent);
    }
    return fetchedCategoryList.filter((category) => category.parent?.id === parentCategory?.id);
  };

  const getCategoryPath = () => {
    const path = [ROOT];
    selectedCategory.ancestors.forEach((parentCategory) => {
      const categoryObject = fetchedCategoryList.find(
        (category) => parentCategory.id === category.id,
      );
      categoryObject && path.push(categoryObject);
    });
    selectedCategory !== ROOT && path.push(selectedCategory);
    return path;
  };

  const handleSelectCategory = async (category: ICategory) => {
    onSelect(category, categoryName);
    setSelectedCategory(category);
  };

  return (
    <div className="category-navigator">
      <CategorySlider
        categoryList={subcategoryList}
        selectedCategory={selectedCategory}
        onSelect={handleSelectCategory}
      />
      <Breadcrumbs categoryPathArray={getCategoryPath()} onSelect={handleSelectCategory} />
    </div>
  );
};
