import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import productos from './productos.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getAllProducts(): Product[] {
    return productos.products as Product[];
  }

  getProductById(id: number): Product | undefined {
    return productos.products.find(product => product.id === id) as Product | undefined;
  }

  getProductsByCategory(category: string): Product[] {
    return productos.products.filter(product => product.category === category) as Product[];
  }
} 