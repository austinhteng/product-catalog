import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'password-game',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password-game.html',
  styleUrls: ['./password-game.css'],
})
export class PasswordGame {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/[A-Z]/),  //Note: Could be collapsed into one regex.
          Validators.pattern(/[a-z]/),
          Validators.pattern(/[0-9]/),
          Validators.pattern(/[^A-Za-z0-9]/),
          this.containsPhoneNumber
        ]
      ],
      confirmPassword: ['', Validators.required, this.passwordMatchValidator('password', 'confirmPassword')]
    });
    // }, { validators: this.passwordMatchValidator('password', 'confirmPassword') });
  }

  get password() {
    return this.passwordForm.get('password');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  // Helper methods for criteria
  hasLength() { return this.password?.value?.length >= 8; }
  hasUpper() { return /[A-Z]/.test(this.password?.value); }
  hasLower() { return /[a-z]/.test(this.password?.value); }
  hasNumber() { return /[0-9]/.test(this.password?.value); }
  hasSymbol() { return /[^A-Za-z0-9]/.test(this.password?.value); }

  // Custom validator: phone number in format XXX-XXX-XXXX
  containsPhoneNumber(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    const phoneRegex = /\d{3}-\d{3}-\d{4}/; // match 10 digits like 123-456-7890
    return phoneRegex.test(value) ? null : { phoneNumberMissing: true };
  }

  passwordMatchValidator(passwordField: string, confirmField: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordField)?.value;
      const confirm = group.get(confirmField)?.value;
      return password === confirm ? null : { passwordMismatch: true };
    };
  }

  submitPassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    alert('Password accepted!');
  }
}
