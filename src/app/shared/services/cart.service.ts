import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { FoodService } from './food.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './oder.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: CartItem[] = [];
  cartItems: CartItem[] = [];
  private apiUrl = 'http://ec2-13-235-114-103.ap-south-1.compute.amazonaws.com:8443/orders';

  constructor(private foodService: FoodService, private http: HttpClient, private router: Router,private toastr: ToastrService, private orderService: OrderService) { }



  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('cartItems');
  }


  removeFromCart(item: CartItem) {
    
  }



  // Checkout cart
  public checkoutCart(): any {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    console.log(this.cartItems);
    const order = this.cartItems.map(obj => {
      const { id, name, description, type, price } = obj;
      return { id, name, description, type, price };
    });
    console.log(order);
    this.http.post(this.apiUrl, order).subscribe((response: any) => {
      if (response) {
        this.router.navigate(['/order-confirmation'], { state: { orderId: response.id } });
        this.toastr.success('Enjoy you Meal', 'Order confirmed');
      } else {
        alert('There was an error processing your order. Please try again later.');
      }
    })
  }
}
