// product.service.ts
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product';   // <-- import your Product class

import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    http: HttpClient = inject(HttpClient)
    private readonly apiUrl = '/api/ProductCatalog';

    private products: Product[] = []; // Placeholder for cached products.

    private productLookup: Map<number, Product> = new Map<number, Product>(
        this.products.map((product) => [product.id, product])
    );

    getProducts(): Observable<Product[]> { 
    return this.http.get<Product[]>(`${this.apiUrl}`).pipe(
        tap(products => {
            this.products = products;
            this.productLookup = new Map<number, Product>(
                products.map(p => [p.id, p])
            );
        })
    );
}


    toggleProduct(productId: number): Observable<void> {

        return this.http.put<void>(`${this.apiUrl}/ToggleActive/${productId}`, null);
    }

    addProduct(product: Product): Observable<void> {
        console.log("Saving new item:", product);
        // this.products.push(product);
        // this.productLookup.set(product.id, product);
        return this.http.post<void>(`${this.apiUrl}/PostProduct`, product);
    }

    /*
        Note: This is interesting. I can't make this async because it's used to compute a signal in StoreService.
        Meaning ideally this should stay synchronous and be based on cached data only.
        Or better yet cache the total cost in StoreService and update it as items are added/removed.
        TODO: Refactor to separate service for working with cached data instead.
    */
    getProductById(id: number): Product | undefined {
        console.log(`ProductService lookup: ${id}`);

        // return this.http.get<Product>(`${this.apiUrl}/${id}`);
        return this.productLookup.get(id);
    }
}
