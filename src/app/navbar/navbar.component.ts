import { Component, Input, OnInit } from '@angular/core';
import { FoodListComponent } from '../food-list/food-list.component';
import { FoodService } from '../shared/services/food.service';
import { FoodItem } from '../shared/models/food-item.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title = 'Food Ordering App';
 
  constructor() { }


  ngOnInit(): void {
  }


}
