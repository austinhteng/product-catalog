// product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product';   // <-- import your Product class

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [
        //   new Product(1, 'Apple', 1.99), Note: So, I know that interfaces can't be instantiated, but why am I allowed to do the following?
        //   new Product(2, 'Banana', 0.99),
        { id: 512, name: 'Apple', price: 1.99 },
        { id: 15, name: 'Banana', price: 0.99 },
        { id: 1251, name: 'Grapes', price: 1.12 },
        { id: 251, name: 'Bread', price: 0.00 },
        { id: 983, name: 'Oranges', price: 12.99 },
        { id: 3, name: 'Pears', price: 0.49 }
    ];

    getProducts(): readonly Product[] {
        return this.products;
    }

    deleteProductByIndex(index: number): void {
        this.products.splice(index, 1);
    }
}
