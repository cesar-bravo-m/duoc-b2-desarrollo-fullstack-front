import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal fade show" [class.d-block]="isOpen" tabindex="-1" (click)="closeModal()">
      <div class="modal-dialog modal-lg" (click)="$event.stopPropagation()">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ product?.name }}</h5>
            <button type="button" class="btn-close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <img [src]="product?.imageUrl" [alt]="product?.name" class="img-fluid rounded">
              </div>
              <div class="col-md-6">
                <h4 class="mb-3">\${{ product?.price?.toFixed(2) }}</h4>
                <p class="mb-3">{{ product?.description }}</p>
                <div class="d-flex align-items-center mb-3">
                  <label class="me-2">Cantidad:</label>
                  <select class="form-select w-auto" [(ngModel)]="quantity">
                    <option *ngFor="let num of [1,2,3,4,5]" [value]="num">{{ num }}</option>
                  </select>
                </div>
                <p class="mb-3">
                  <span [class]="product && product.stock > 0 ? 'text-success' : 'text-danger'">
                    {{ product && product.stock > 0 ? 'En Stock' : 'Agotado' }}
                  </span>
                  <span class="ms-2 text-muted" *ngIf="product && product.stock > 0">
                    ({{ product.stock }} disponibles)
                  </span>
                </p>
                <button 
                  class="btn btn-primary"
                  (click)="addToCart()"
                  [disabled]="!product || product.stock === 0">
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="isOpen" (click)="closeModal()"></div>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1050;
      overflow-x: hidden;
      overflow-y: auto;
      outline: 0;
      display: none;
    }
    :host.show {
      display: block;
    }
  `]
})
export class ProductDetailsModalComponent {
  @Input() product: Product | null = null;
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  quantity = 1;

  constructor(private cartService: CartService) {}

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    document.body.classList.remove('modal-open');
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.closeModal();
    }
  }
} 