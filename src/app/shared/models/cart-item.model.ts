import { FoodItem } from "./food-item.model";
export class CartItem {
    //provide code here to define CartItem interface
    id: number;
    name: string;
    price: number;
    quantity: number;
    //make a constructor with all required parameters
    constructor(id: number, name: string,price:number,quantity:number){
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
      }
}
