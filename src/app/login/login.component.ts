import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCredentials } from '../binding/login-credential';
import { AuthService } from '../service/auth-service/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup(
                    {
                      'username': new FormControl(
                                              '',
                                              [
                                                Validators.required,
                                                Validators.email
                                              ]
                                            ),
                      'password': new FormControl()
                    }
                  );

  invalidLogin: boolean|undefined = undefined;
  private returnUrl: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = route.snapshot.queryParamMap.get('returnUrl');
  }

  ngOnInit(): void {
  }

  submit(){
    console.log("Login Form Submitted.");
    this.authService.login(
                      new LoginCredentials(
                        this.loginForm.value.username,
                        this.loginForm.value.password
                      )
                    ).subscribe(
                      {
                        next: (loginSuccess)=>{
                                          if(loginSuccess){
                                            this.router.navigate(
                                                        [this.returnUrl || '/']
                                                      );
                                          }else{
                                            this.invalidLogin = !loginSuccess;
                                          }
                                        }
                      }
                    );
  }

}
