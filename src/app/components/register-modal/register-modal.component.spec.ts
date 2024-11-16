import { TestBed } from '@angular/core/testing';
import { RegisterModalComponent } from './register-modal.component';

describe('RegisterModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterModalComponent]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(RegisterModalComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should check if passwords match', () => {
    const fixture = TestBed.createComponent(RegisterModalComponent);
    const component = fixture.componentInstance;
    expect(component.passwordMatchValidator()).toBeTruthy();
  });

  it('should check if the password contains at least one number and one capital letter', () => {
    const fixture = TestBed.createComponent(RegisterModalComponent);
    const component = fixture.componentInstance;
    component.password.setValue('password'); // Inválido
    expect(component.passwordNotValidValidator()).toBeTruthy();
    component.password.setValue('Password1'); // Válido
    expect(component.passwordNotValidValidator()).toBeNull();
    component.password.setValue('Password123'); // Válido
    expect(component.passwordNotValidValidator()).toBeNull();
  });

  it('address is optional', () => {
    const fixture = TestBed.createComponent(RegisterModalComponent);
    const component = fixture.componentInstance;
    expect(component.address.errors?.['required']).toBeFalsy();
  });

  it('age should be > 13', () => {
    const fixture = TestBed.createComponent(RegisterModalComponent);
    const component = fixture.componentInstance;
    component.birthday.setValue(new Date('2000-01-01'));
    expect(component.ageValidator()).toBeTruthy();
    component.birthday.setValue(new Date('2020-01-01'));
    expect(component.ageValidator()).toBeNull();
  });
});

