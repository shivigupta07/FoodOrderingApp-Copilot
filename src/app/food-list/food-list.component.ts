import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/models/cart-item.model';
import { FoodItem } from '../shared/models/food-item.model';
import { CartService } from '../shared/services/cart.service';
import { FoodService } from '../shared/services/food.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {
  //create a foodList array of FoodItem type
  foodList: FoodItem[] = [];

  cartItems: CartItem[] = [];
  foodItems: FoodItem[] = [];

  //create here a constructor with all required parameters
  constructor(private foodService: FoodService, private cartService: CartService,private toastr: ToastrService, private http:HttpClient) { }


  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    this.getFoodItems().subscribe((data: FoodItem[]) => {
      this.foodList = data;
      console.log(this.foodItems);
    });
    
  }


  
  getFoodItems() {
      const url = 'https://ec2-13-235-114-103.ap-south-1.compute.amazonaws.com:8443/api/menu';
      return this.http.get<FoodItem[]>(url);
  }
  

  //create a function addToCart here such that it will add the item to the cart
  addToCart(item: FoodItem): void {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem: any = {
        id: item.id,
        name: item.name,
        description: item.description,
        type: item.type,
        price: item.price,
        quantity: 1,
      };
      this.cartItems.push(newItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.toastr.success('You can add more items.', `HURRAH...! ${item.name} Added`);
  }
}

