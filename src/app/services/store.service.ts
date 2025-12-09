import { Product } from "../models/product";

export class StoreService {
    private shoppingCart: Map<Product, number> = new Map<Product, number>();

    addToCart(product: Product) : void {
        if (this.shoppingCart.has(product)) {
            this.shoppingCart.set(product, this.shoppingCart.get(product)! + 1);
        } else {
            this.shoppingCart.set(product, 1);
        }
    }

    clearCart() : void {
        this.shoppingCart.clear();
    }

    getCartItems() : ReadonlyMap<Product, number> { //Note: ReadonlyMap instead of readonly modifier is weird.
        return this.shoppingCart;
    }
}
