import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductItemCreatePreview } from '../product-item-create-preview/product-item-create-preview';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'product-item-create',
  standalone: true,
  imports: [ReactiveFormsModule, ProductItemCreatePreview, CommonModule],
  templateUrl: './product-item-create.html',
  styleUrl: './product-item-create.css',
})
export class ProductItemCreate {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router: Router = inject(Router);

  id: string = '';
  name: string = '';
  price: number = 0.00;
  itemForm: any;

  ngOnInit(): void {
      this.itemForm = this.fb.group({
      id: new FormControl( this.id, [Validators.required, Validators.min(1), this.productIdNotUsedValidator]),
      name: new FormControl(this.name, [Validators.required, Validators.minLength(2)]),
      price: new FormControl(this.price, [Validators.required, Validators.min(0.01)]),
    });
  }

  saveNewItem(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const product = this.itemForm.value;

    console.log("Saving new item:", product);

    this.productService.addProduct({
      id: product.id!,
      name: product.name!,
      price: product.price!
    });

    this.router.navigate(['/products']);
  }

  productIdNotUsedValidator = (control: AbstractControl): ValidationErrors | null => {
    const id = Number(control.value);
    const product = this.productService.getProductById(id);
    return product == null ? null : { idUsed: true };
  };

  onlyDigits(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (allowedKeys.includes(event.key)) return;

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }
}
