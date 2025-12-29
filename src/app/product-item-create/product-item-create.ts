import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'product-item-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
  description: string = '';
  categoryId: number = 0;
  itemForm: any;

  ngOnInit(): void {
      this.itemForm = this.fb.group({
      name: new FormControl(this.name, [Validators.required, Validators.minLength(2)]),
      price: new FormControl(this.price, [Validators.required, Validators.min(0.01)]),
      description: new FormControl(this.description, [Validators.required]),
      categoryId: new FormControl(this.categoryId, [Validators.required, Validators.min(1)])
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
      id: -1,  // Placeholder, backend should assign real ID.
      productName: product.name!,
      price: product.price!,
      description: product.description!,
      categoryId: product.categoryId!,
      categoryName: ""
    }).subscribe(() => {
      this.router.navigate(['/products']);
    });
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
