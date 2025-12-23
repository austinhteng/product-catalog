export interface Product {
    //id, name, price
    id: number;
    name: string;
    price: number;
    description: string;
    categoryId: number;    //1 = Produce, 2 = Electronics, 3 = Entertainment, 4 = Frozen foods


    //Products: id, name, category
    //category: id, name
}
