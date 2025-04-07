import { CategoryName } from '@/constants';
import { create } from 'zustand';

type CategoryStore = {
  selectedCategory: CategoryName;
  setSelectedCategory: (name: CategoryName) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategory: 'Beach front',
  setSelectedCategory: (name) => set({ selectedCategory: name }),
}));