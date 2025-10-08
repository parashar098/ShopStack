
import { PlaceHolderImages } from '@/lib/placeholder-images';

export type Category = {
  name: string;
  imageURL: string;
  imageHint: string;
};

export const mockCategories: Category[] = [
  {
    name: 'Furniture',
    imageURL: PlaceHolderImages.find(p => p.id === 'category-furniture')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'category-furniture')?.imageHint || '',
  },
  {
    name: 'Electronics',
    imageURL: PlaceHolderImages.find(p => p.id === 'category-electronics')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'category-electronics')?.imageHint || '',
  },
  {
    name: 'Accessories',
    imageURL: PlaceHolderImages.find(p => p.id === 'category-accessories')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'category-accessories')?.imageHint || '',
  },
  {
    name: 'Home Goods',
    imageURL: PlaceHolderImages.find(p => p.id === 'category-home-goods')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'category-home-goods')?.imageHint || '',
  },
];
