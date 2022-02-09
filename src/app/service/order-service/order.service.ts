import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  allOrders(){
    return this.http.get<{orders: number[]}>('/api/orders')
                    .pipe(
                      tap(
                        {
                          next: (response)=>{
                                  console.log("[OrderService] got response: ", response);
                                }
                        }
                      )
                    );
  }
}
