// product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product';   // <-- import your Product class

import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [
        //   new Product(1, 'Apple', 1.99), Note: So, I know that interfaces can't be instantiated, but why am I allowed to do the following? Is the difference purely memory location?
        //   new Product(2, 'Banana', 0.99),
        { id: 512, name: 'Apple', price: 1.99 },
        { id: 15, name: 'Banana', price: 0.99 },
        { id: 1251, name: 'Grapes', price: 1.12 },
        { id: 251, name: 'Bread', price: 0.00 },
        { id: 983, name: 'Oranges', price: 12.99 },
        { id: 3, name: 'Pears', price: 0.49 }
    ];

    private productLookup: Map<number, Product> = new Map<number, Product>(
        this.products.map((product) => [product.id, product])
    );

    getProducts(): Observable<readonly Product[]> {
        return of(this.products);
    }

    deleteProductByIndex(index: number): Observable<void> {
        let removed: Product = this.products.splice(index, 1).at(0)!;
        this.productLookup.delete(removed.id);
        return of(undefined);
    }

    addProduct(product: Product): Observable<void> {
        this.products.push(product);
        this.productLookup.set(product.id, product);
        return of(undefined);
    }

    /*
        Note: This is interesting. I can't make this async because it's used to compute a signal in StoreService.
        Meaning ideally this should stay synchronous and be based on cached data only.
        Or better yet cache the total cost in StoreService and update it as items are added/removed.
    */
    getProductById(id: number): Product | undefined {
        console.log(`ProductService lookup: ${id}`);
        
        return this.productLookup.get(id);
    }
}
