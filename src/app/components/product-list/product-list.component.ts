import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductDetailsModalComponent } from '../product-details-modal/product-details-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductDetailsModalComponent],
  template: /*html*/ `
    <div class="container">
      <div class="row g-4">
        <div class="col-md-3" *ngFor="let product of products">
          <div class="card h-100">
            <img [src]="product.imageUrl" class="card-img-top" [alt]="product.name">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text text-truncate">{{ product.description }}</p>
              <p class="card-text"><strong>\${{ product.price.toFixed(2) }}</strong></p>
              <div class="d-flex justify-content-between">
                <button class="btn btn-primary" (click)="addToCart(product)">
                  Añadir al carrito
                </button>
                <button class="btn btn-outline-secondary" (click)="showDetails(product)">
                  Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-product-details-modal
      [product]="selectedProduct"
      [(isOpen)]="isModalOpen"
      [class.show]="isModalOpen">
    </app-product-details-modal>
  `,
  styles: [`
    .card-img-top {
      height: 200px;
      object-fit: cover;
    }
    .card {
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class ProductListComponent {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  isModalOpen = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.products = this.productService.getAllProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  showDetails(product: Product) {
    this.selectedProduct = product;
    this.isModalOpen = true;
    document.body.classList.add('modal-open');
  }
} 