// product.service.ts
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product';   // <-- import your Product class

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // http: HttpClient = inject(HttpClient)
    private readonly apiUrl = '/api/products';

    private products: Product[] = [
        // Produce (1)
        { id: 742, name: 'Strawberries', price: 3.49, description: 'Fresh, sweet strawberries perfect for snacking or desserts.', categoryId: 1 },
        { id: 884, name: 'Blueberries', price: 2.99, description: 'Juicy blueberries packed with flavor and antioxidants.', categoryId: 1 },
        { id: 902, name: 'Spinach', price: 1.79, description: 'Fresh leafy spinach ideal for salads and cooking.', categoryId: 1 },
        // { id: 1102, name: 'Carrots', price: 0.89, description: 'Crisp carrots great for snacks, soups, and sides.', categoryId: 1 },
        // { id: 1183, name: 'Avocado', price: 1.29, description: 'Ripe avocado with a creamy texture and mild flavor.', categoryId: 1 },

        // Electronics (2)
        { id: 4001, name: 'Laptop', price: 899.99, description: 'Portable computer suitable for work, school, and entertainment.', categoryId: 2 },
        // { id: 4002, name: 'Smartphone', price: 699.99, description: 'Modern smartphone with a high-resolution display and fast performance.', categoryId: 2 },
        // { id: 4003, name: 'Wireless Headphones', price: 149.99, description: 'Bluetooth headphones offering clear sound and wireless freedom.', categoryId: 2 },
        // { id: 4004, name: 'Bluetooth Speaker', price: 79.99, description: 'Compact speaker delivering rich sound via Bluetooth.', categoryId: 2 },
        // { id: 4005, name: 'Game Console', price: 499.99, description: 'Home gaming console for immersive entertainment experiences.', categoryId: 2 },

        // Entertainment (3)
        { id: 6001, name: 'Board Game', price: 29.99, description: 'Classic board game designed for family and friends.', categoryId: 3 },
        { id: 6002, name: 'Movie DVD', price: 14.99, description: 'DVD movie suitable for home viewing.', categoryId: 3 },
        // { id: 6003, name: 'Video Game', price: 59.99, description: 'Console video game featuring engaging gameplay and visuals.', categoryId: 3 },
        // { id: 6004, name: 'Puzzle', price: 12.99, description: 'Challenging puzzle designed to test problem-solving skills.', categoryId: 3 },
        // { id: 6005, name: 'Comic Book', price: 4.99, description: 'Illustrated comic book with an entertaining storyline.', categoryId: 3 },

        // Frozen Foods (4)
        { id: 8001, name: 'Frozen Pizza', price: 6.99, description: 'Ready-to-bake frozen pizza with classic toppings.', categoryId: 4 },
        { id: 8002, name: 'Ice Cream', price: 4.99, description: 'Creamy frozen dessert available in assorted flavors.', categoryId: 4 },
        // { id: 8003, name: 'Frozen Vegetables', price: 2.49, description: 'Flash-frozen vegetables for convenient cooking.', categoryId: 4 },
        // { id: 8004, name: 'Frozen Chicken Nuggets', price: 7.99, description: 'Breaded chicken nuggets ready to heat and serve.', categoryId: 4 },
        // { id: 8005, name: 'Frozen Waffles', price: 3.99, description: 'Frozen waffles that toast up crisp and golden.', categoryId: 4 },
    ];

    private productLookup: Map<number, Product> = new Map<number, Product>(
        this.products.map((product) => [product.id, product])
    );

    getProducts(): Observable<readonly Product[]> {
        // return this.http.get<readonly Product[]>(this.apiUrl);
        return of(this.products);
    }

    deleteProductByIndex(index: number): Observable<void> {
        let removed: Product = this.products.splice(index, 1).at(0)!;
        this.productLookup.delete(removed.id);
        // return this.http.delete<void>(`${this.apiUrl}/${removed.id}`);
        return of(undefined);
    }

    addProduct(product: Product): Observable<void> {
        this.products.push(product);
        this.productLookup.set(product.id, product);
        // return this.http.post<void>(this.apiUrl, product);
        return of(undefined);
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
