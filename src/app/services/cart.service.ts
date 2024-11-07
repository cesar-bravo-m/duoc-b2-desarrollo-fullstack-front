import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.interface';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { product, quantity }]);
    }
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next(currentItems.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItems.getValue();
    const item = currentItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
    }
  }

  getTotal() {
    return this.cartItems.getValue().reduce(
      (total, item) => total + (item.product.price * item.quantity), 0
    );
  }

  clearCart() {
    this.cartItems.next([]);
  }
} 