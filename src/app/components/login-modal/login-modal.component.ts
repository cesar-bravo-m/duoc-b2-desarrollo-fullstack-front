import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal fade show" [class.d-block]="isOpen" tabindex="-1" (click)="closeModal()">
      <div class="modal-dialog" (click)="$event.stopPropagation()">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Iniciar Sesión</h5>
            <button type="button" class="btn-close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" id="login-email" [(ngModel)]="email" name="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="login-password" [(ngModel)]="password" name="password" required>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="remember" [(ngModel)]="rememberMe" name="remember">
                <label class="form-check-label" for="remember">Recordarme</label>
              </div>
              <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
            <div class="text-center mt-3">
              <p class="mb-0">¿No tienes una cuenta? 
                <a href="#" class="text-primary" (click)="openRegister($event)">Regístrate aquí</a>
              </p>
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
  `]
})
export class LoginModalComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() openRegisterModal = new EventEmitter<void>();

  email = '';
  password = '';
  rememberMe = false;

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    document.body.classList.remove('modal-open');
  }

  openRegister(event: Event) {
    event.preventDefault();
    this.closeModal();
    this.openRegisterModal.emit();
  }

  onSubmit() {
    console.log('Login attempt with:', { email: this.email, password: this.password, rememberMe: this.rememberMe });
    // Implement login logic here
    this.closeModal();
  }
} 