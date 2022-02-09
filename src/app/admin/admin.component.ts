import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order-service/order.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allOrders: number[] = [];

  constructor(private orderService: OrderService) {
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
