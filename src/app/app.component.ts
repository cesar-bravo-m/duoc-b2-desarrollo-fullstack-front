import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ProductListComponent,
    CartModalComponent,
    LoginModalComponent,
    RegisterModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'La Bóveda del Dragón';
  cartItemCount = 0;
  isCartOpen = false;
  isLoginOpen = false;
  isRegisterOpen = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  openCart() {
    this.isCartOpen = true;
    document.body.classList.add('modal-open');
  }

  openLogin() {
    this.isLoginOpen = true;
    document.body.classList.add('modal-open');
  }

  openRegister() {
    this.isRegisterOpen = true;
    document.body.classList.add('modal-open');
  }
}
