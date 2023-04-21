import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-confirmation',
  template: `
  <!-- provide code here to display order confirmation page -->
  <div class="container-fluid bg-light">
      <div class="row">
        <div class="col-md-12 text-center mt-5">
          <h1 class="text-primary display-1 mb-4">Thank You!</h1>
          <p class="lead text-dark mb-5">Your order has been placed successfully. Your order ID is <strong>{{ orderId }}</strong>.</p>
        </div>
      </div>
    </div>
  `,
//provide css code here
    styles: [`
      .bg-light {
      background-color: #f8f9fa;
    }
    h1 {
      font-size: 4rem;
      font-weight: bold;
      color: #007bff;
      text-shadow: 2px 2px #000000;
      margin-top:70px;
    }
    p {
      font-size: 1.5rem;
      margin-bottom: 50px;
      color: #000000;
    }
    strong {
      font-weight: bold;
      color: #007bff;
    }
    `]
})
export class OrderConfirmationComponent implements OnInit {
  orderId: string;
 //make constructor here with all required parameters
 constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.orderId = navigation?.extras?.state?.['orderId'];
  }
 //provide code here to get order id from navigation state
 ngOnInit(): void {
    if (!this.orderId) {
      this.router.navigate(['/']);
    }
  }
}
