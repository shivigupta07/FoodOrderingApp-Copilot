import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/models/cart-item.model';
import { FoodItem } from '../shared/models/food-item.model';
import { CartService } from '../shared/services/cart.service';
import { FoodService } from '../shared/services/food.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { EMPTY, catchError, map } from 'rxjs';



@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {
  
  //create a foodList array of FoodItem type
  foodList: FoodItem[] = [];

  
  cartItems: CartItem[] = [];

  //create here a constructor with all required parameters
  constructor(private foodService: FoodService, private cartService: CartService, private toastr: ToastrService, private http: HttpClient) { }


  ngOnInit(): void {
    this.getFoodItems();
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  }
  
  
  getFoodItems(): void {
    this.foodService.getFoodItems()
      .pipe(
        map((foodItems: any[]) => {
          return foodItems.map(item => {
            item.rating = Math.floor(Math.random() * 5) + 1;
            if (item.name.includes('Grilled Salmon')) {
              item.imageUrl = './assets/grilled_salmon.jpg';
            } else if (item.name.includes('Caprese Salad')) {
              item.imageUrl = './assets/burger.jpg';
            }
            else {
              item.imageUrl = './assets/food.png';
              item.rating = Math.floor(Math.random() * 5) + 1;
            }
            return item;
          });
        }),
        catchError((error: any) => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe(
        (foodItems: FoodItem[]) => {
          this.foodList = foodItems;
        },
        (error: any) => {
          console.error(error);
        }
      );
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


  sortByName() {
    this.foodList.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }
  
  sortByPrice() {
    this.foodList.sort((a, b) => {
      return a.price - b.price;
    });
  }

  sortByRating() {
    this.foodList.sort((a, b) => {
      return b.rating - a.rating;
    });
  }


}

