import { computed, inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";

import { ProductService } from "./product.service";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    productService: ProductService = inject(ProductService);
    
    private shoppingCart: WritableSignal<Map<number, number>> = signal<Map<number, number>>(new Map<number, number>());
    private totalCost: Signal<number>= computed<number>(() => {
        return this.calculateCost(this.shoppingCart());
    });

    addToCart(productId: number) : Observable<void> {
        console.log(`${productId} added to cart.`);
        
        let cart: Map<number, number> = new Map(this.shoppingCart());   //Note: Yes, this is somewhat inefficient; cart shouldn't be large though.
        if (cart.has(productId)) {
            cart.set(productId, cart.get(productId)! + 1);
        } else {
            cart.set(productId, 1);
        }
        this.shoppingCart.set(cart);
        return of(undefined);
    }

    clearCart() : Observable<void> {
        this.shoppingCart.set(new Map<number, number>());
        return of(undefined);
    }

    getCartItems() : Signal<Map<number, number>> { //Note: ReadonlyMap instead of readonly modifier is weird.
        return this.shoppingCart.asReadonly();
    }

    removeItem(productId: number) : Observable<void> {
        let cart: Map<number, number> = new Map(this.shoppingCart());
        cart.delete(productId); //Note: No need to check if it exists first.
        this.shoppingCart.set(cart);
        return of(undefined);
    }

    removeSingleItem(productId: number) : Observable<void> {
        let cart: Map<number, number> = new Map(this.shoppingCart());
        if (cart.has(productId)) {
            cart.set(productId, cart.get(productId)! - 1)!;
            if (cart.get(productId)! <= 0) {
                cart.delete(productId);
            }
        }
        this.shoppingCart.set(cart);
        return of(undefined);
    }

    private calculateCost(cart: Map<number, number>) : number {
        let total: number = 0;
        cart.forEach((count: number, productId: number) => {
            //Note: This is inefficient; StoreService probably shouldn't be dependent on ProductService. Consider refactoring later.
            let product = this.productService.getProductById(productId);
            if (product != null) {
                total += product.price * count;
            }
        });
        return total;
    }

    getTotalCost() : Signal<number> {
        return this.totalCost;
    }
}
