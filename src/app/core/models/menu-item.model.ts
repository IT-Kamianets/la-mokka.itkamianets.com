export interface MenuItem {
  id: number;
  category: 'breakfasts' | 'menu' | 'drinks';
  name: string;
  description: string;
  price: number;
  weight: string;
  prepTime: string;
  image: string;
}
