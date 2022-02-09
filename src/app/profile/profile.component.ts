import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service/auth.service';
import { OrderService } from '../service/order-service/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string | undefined;
  firstName: string | undefined;
  allOrders: number[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    let loggedUser = authService.getLoggedUser();
    this.username = loggedUser?.username;
    this.firstName = loggedUser?.firstName;

    orderService.allOrders()
                .subscribe(
                  {
                    next: (data)=>{
                            this.allOrders = (data.orders as number[]);
                          }
                  }
                );
  }

  ngOnInit(): void {
  }

}
