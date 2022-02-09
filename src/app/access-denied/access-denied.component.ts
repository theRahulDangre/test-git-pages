import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  timer: number = 0;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    let timerCall = setInterval(
                      ()=>{
                        this.timer+=1;
                        if(this.timer==5){
                          clearInterval(timerCall);
                          this.router.navigate(['/']);
                        }
                      },
                      1000
                    );
  }

}
