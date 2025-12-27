export interface Product {
    //id, name, price
    id: number;
    productName: string;
    price: number;
    description: string;
    categoryId: number;    //1 = Produce, 2 = Electronics, 3 = Entertainment, 4 = Frozen foods
    categoryName?: string;

    //Products: id, name, category
    //category: id, name
}
