import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/models/cart-item.model';
import { FoodItem } from '../shared/models/food-item.model';
import { CartService } from '../shared/services/cart.service';
import { FoodService } from '../shared/services/food.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {
  //create a foodList array of FoodItem type
  foodList: FoodItem[] = [
    { id: 1, name: "Pizza", description: "Delicious pizza with all your favorite toppings!", price: 9.99,  imageUrl: './assets/pizza.jpg' },
    { id: 2, name: "Burger", description: "Juicy burger with all the fixings!", price: 6.99 ,  imageUrl: './assets/burger.jpg'},
    { id: 3, name: "Fries", description: "Crispy fries with your choice of dipping sauce.", price: 3.99,  imageUrl: './assets/fries.jpg' },
    { id: 4, name: "Samosa", description: "Crispy and savory triangular pastry filled with spiced vegetables!", price: 2.99,  imageUrl: './assets/samosa.jpg' },
    { id: 5, name: "Dosa", description: "Savory,Crispy made from fermented rice,with delicious chutneys and sambar.", price: 16.99 ,  imageUrl: './assets/dosa.jpg'},
    { id: 6, name: "Dhokla", description: "Fluffy and spongy Gujarati snack made from fermented batter!", price: 7.99,  imageUrl: './assets/dhokla.jfif' }
  ];
  cartItems: CartItem[] = [];
  foodItems: FoodItem[] = [];
  //create here a constructor with all required parameters
  constructor(private foodService: FoodService, private cartService: CartService,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
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
        price: item.price,
        quantity: 1,
      };
      this.cartItems.push(newItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.toastr.success('You can add more items.', `HURRAH...! ${item.name} Added`);
  }
}

