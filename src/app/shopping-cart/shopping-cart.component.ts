import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodItem } from '../shared/models/food-item.model';
import { CartItem } from '../shared/models/cart-item.model';
import { CartService } from '../shared/services/cart.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
//provide code of shopping-cart.component.ts here like code of increment and decrement function, remove item function, total price function, etc.
  constructor(private cartService: CartService, private http: HttpClient) { }

  cartItems:any = [];
  //cartItems: CartItem[] = [];
  totalPrice: number = 0;


  //ngOnoit code here
  ngOnInit(): void {
  this.updateCart();
  //this.cartItems = this.cartService.getItems();
  }


  //updateCart code here
  updateCart(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.totalPrice = this.cartItems.reduce((total:number, item:any) => total + (item.price * item.quantity), 0);
  }



  //removeItem function here
  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.updateCart();
  }


  //removeFromCart function here
  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getItems();
  }


  //clearCart function here
  clearCart(): void {
    localStorage.removeItem('cartItems');
    this.cartItems = [];
    this.totalPrice = 0;
  }



  //getTotalPrice function here
  getTotalPrice() {
    return this.cartItems.reduce((total:number, item:any) => total + item.price * item.quantity, 0);
  }


  //checkoutCart function here
  checkoutCart() {
    this.cartService.checkoutCart();
    this.clearCart();
  }
}
