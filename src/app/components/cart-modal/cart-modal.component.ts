import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal fade show" [class.d-block]="isOpen" tabindex="-1" (click)="onBackdropClick($event)">
      <div class="modal-dialog modal-lg" (click)="$event.stopPropagation()">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Carrito de Compras</h5>
            <button type="button" class="btn-close" (click)="close()"></button>
          </div>
          <div class="modal-body">
            <div *ngIf="cartItems.length === 0" class="text-center py-5">
              <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
              <p class="lead">Tu carrito está vacío</p>
              <button class="btn btn-primary" (click)="close()">Continuar Comprando</button>
            </div>
            
            <div *ngIf="cartItems.length > 0">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of cartItems">
                      <td>
                        <div class="d-flex align-items-center">
                          <img [src]="item.product.imageUrl" 
                               [alt]="item.product.name" 
                               class="cart-item-image me-3">
                          <span>{{ item.product.name }}</span>
                        </div>
                      </td>
                      <td>\${{ item.product.price.toFixed(2) }}</td>
                      <td>
                        <select class="form-select form-select-sm w-auto" 
                                [(ngModel)]="item.quantity"
                                (change)="updateQuantity(item.product.id, item.quantity)">
                          <option *ngFor="let num of [1,2,3,4,5]" [value]="num">
                            {{ num }}
                          </option>
                        </select>
                      </td>
                      <td>\${{ (item.product.price * item.quantity).toFixed(2) }}</td>
                      <td>
                        <button class="btn btn-sm btn-danger" 
                                (click)="removeItem(item.product.id)">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-end"><strong>Total:</strong></td>
                      <td colspan="2"><strong>\${{ getTotal().toFixed(2) }}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div class="d-flex justify-content-between mt-4">
                <button class="btn btn-outline-secondary" (click)="close()">
                  Seguir Comprando
                </button>
                <button class="btn btn-success" (click)="checkout()">
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="isOpen"></div>
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
    .cart-item-image {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }
    .table > :not(caption) > * > * {
      vertical-align: middle;
    }
    .modal {
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
    .modal-dialog {
      cursor: default;
    }
  `]
})
export class CartModalComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  cartItems: Array<{product: any, quantity: number}> = [];

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.close();
    }
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.close();
    }
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    document.body.classList.remove('modal-open');
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  checkout() {
    // Implement checkout logic
    console.log('Proceeding to checkout...');
    this.close();
  }
} 