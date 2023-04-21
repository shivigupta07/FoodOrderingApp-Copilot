import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { FoodItem } from '../models/food-item.model';
import { FoodService } from './food.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: CartItem[] = [];
  cartItems: CartItem[] = [];
  private apiUrl = 'http://localhost:3000';

  constructor(private foodService: FoodService, private http: HttpClient, private router: Router,private toastr: ToastrService) { }

  addToCart(foodItem: CartItem) {
   
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
  }

  removeFromCart(item: CartItem) {
    
  }

  // Checkout cart
  public checkoutCart(): any {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    console.log(this.cartItems);
    const order = this.cartItems;
    this.http.post('http://localhost:3000/checkout', order).subscribe((response: any) => {
      if (response.success) {
        this.router.navigate(['/order-confirmation'], { state: { orderId: response.orderId } });
        this.toastr.success('Enjoy you Meal', 'Order confirmed');
      } else {
       
        alert('There was an error processing your order. Please try again later.');
      }
      return response;
    })
  }
}
