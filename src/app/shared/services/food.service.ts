import { Injectable } from '@angular/core';
import { FoodItem } from '../models/food-item.model';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private endPoint = 'http://ec2-13-235-114-103.ap-south-1.compute.amazonaws.com:8443';

  constructor(private http: HttpClient) {}

  getFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(this.endPoint+'/api/menu');
  }
}