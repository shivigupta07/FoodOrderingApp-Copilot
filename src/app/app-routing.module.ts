import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodListComponent } from './food-list/food-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
const routes: Routes = [
  //provide code here to route to food-list and shopping-cart component
  { path: '', redirectTo: '/food-list', pathMatch: 'full' },
  { path: 'food-list', component: FoodListComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
