import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal fade show" [class.d-block]="isOpen" tabindex="-1" (click)="closeModal()">
      <div class="modal-dialog" (click)="$event.stopPropagation()">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Registro</h5>
            <button type="button" class="btn-close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label for="name" class="form-label">Nombre Completo</label>
                <input type="text" class="form-control" id="name" [(ngModel)]="userData.name" name="name" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" id="email" [(ngModel)]="userData.email" name="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="password" [(ngModel)]="userData.password" name="password" required>
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
                <input type="password" class="form-control" id="confirmPassword" [(ngModel)]="userData.confirmPassword" name="confirmPassword" required>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="terms" [(ngModel)]="userData.acceptTerms" name="terms" required>
                <label class="form-check-label" for="terms">
                  Acepto los términos y condiciones
                </label>
              </div>
              <button type="submit" class="btn btn-primary w-100" [disabled]="!isFormValid()">
                Registrarse
              </button>
            </form>
            <div class="text-center mt-3">
              <p class="mb-0">¿Ya tienes una cuenta? 
                <a href="#" class="text-primary" (click)="openLogin($event)">Inicia sesión aquí</a>
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
export class RegisterModalComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() openLoginModal = new EventEmitter<void>();

  userData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    document.body.classList.remove('modal-open');
  }

  openLogin(event: Event) {
    event.preventDefault();
    this.closeModal();
    this.openLoginModal.emit();
  }

  isFormValid(): boolean {
    return (
      this.userData.name.length > 0 &&
      this.userData.email.length > 0 &&
      this.userData.password.length > 0 &&
      this.userData.password === this.userData.confirmPassword &&
      this.userData.acceptTerms
    );
  }

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Register attempt with:', this.userData);
      // Implement registration logic here
      this.closeModal();
    }
  }
} 