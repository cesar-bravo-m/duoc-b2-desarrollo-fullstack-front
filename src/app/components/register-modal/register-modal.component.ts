import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-modal.component.html',
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

  userData!: FormGroup;

  constructor(private fb : FormBuilder) {}

  ngOnInit(): void {
    this.userData = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18), this.passwordNotValidValidator()]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue],
      address: [''],
      birthday: ['', [Validators.required, this.ageValidator()]]
    }, { validators: this.passwordMatchValidator() });
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return Validators.email(control) ?? null;
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      const res = password === confirmPassword ? null : { passwordMismatch: true };
      control.get('confirmPassword')?.setErrors(res);
      return res;
    };
  }

  passwordNotValidValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const containsNumber = /[0-9]/.test(password);
      const containsCapitalLetter = /[A-Z]/.test(password);
      return containsNumber && containsCapitalLetter ? null : { passwordNotValid: true };
    };
  }

  ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthday = new Date(control.value);
      const today = new Date();
      if (!birthday) return null;
      const age = today.getFullYear() - birthday.getFullYear();
      return age > 13 ? null : { ageNotValid: true };
    };
  }

  get name() {
    return this.userData.get('name')!;
  }

  get email() {
    return this.userData.get('email')!;
  }

  get password() {
    return this.userData.get('password')!;
  }

  get confirmPassword() {
    return this.userData.get('confirmPassword')!;
  }

  get acceptTerms() {
    return this.userData.get('acceptTerms')!;
  }
  
  get address() {
    return this.userData.get('address')!;
  }

  get birthday() {
    return this.userData.get('birthday')!;
  }

  isFormValid(): boolean {
    return this.userData.valid;
  }

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

  canSubmit(): boolean {
    return this.userData.valid && this.acceptTerms.value;
  }

  onSubmit() {
    window.alert('Registro exitoso');
    this.closeModal();
  }

  clearForm() {
    this.userData.reset();
  }
} 