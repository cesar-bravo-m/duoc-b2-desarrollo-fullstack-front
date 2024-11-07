export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'boardgame' | 'rpg' | 'dice' | 'accessory';
  stock: number;
} 