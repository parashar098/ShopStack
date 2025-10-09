
import { PlaceHolderImages } from '@/lib/placeholder-images';

export type Category = {
  name: string;
  imageURL: string;
  imageHint: string;
};

export const mockCategories: Category[] = [
  {
    name: 'Fashion',
    imageURL: PlaceHolderImages.find(p => p.id === 'category-fashion')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'category-fashion')?.imageHint || '',
  },
  {
    name: 'Electronics',
    imageURL: PlaceHolderImages.find(p => p.id === 'category-electronics')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'category-electronics')?.imageHint || '',
  },
  {
    name: 'Home',
    imageURL: PlaceHolderImages.find(p => p.id === 'category-home')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'category-home')?.imageHint || '',
  },
  {
    name: 'Mobiles',
    imageURL: PlaceHolderImages.find(p => p.id === 'category-mobiles')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'category-mobiles')?.imageHint || '',
  },
   {
    name: 'Beauty',
    imageURL: PlaceHolderImages.find(p => p.id === 'category-beauty')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'category-beauty')?.imageHint || '',
  },
   {
    name: 'Lifestyle',
    imageURL: PlaceHolderImages.find(p => p.id === 'category-lifestyle')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'category-lifestyle')?.imageHint || '',
  },
];
