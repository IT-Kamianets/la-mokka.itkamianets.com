export interface MenuItemSize {
  label: string;
  price: number;
}

export interface MenuItem {
  id: number;
  category: 'breakfasts' | 'menu' | 'drinks';
  subcategory?: string;
  name: string;
  description: string;
  price: number;
  sizes?: MenuItemSize[];
  weight: string;
  prepTime: string;
  image: string;
  popular?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
  glutenFree?: boolean;
  rating?: number;
}
