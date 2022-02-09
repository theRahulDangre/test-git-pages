import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs';
import { LoginCredentials } from 'src/app/binding/login-credential';

import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedInUser } from 'src/app/binding/logged-in-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelperService: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelperService = new JwtHelperService();
  }

  login(loginCredentials: LoginCredentials){
    return this.http.post<any>(
                      '/api/authenticate',
                      JSON.stringify(loginCredentials)
                    ).pipe(
                      map(
                        (response: any)=>{
                          if(response && response.token){
                            localStorage.setItem('token', response.token);
                            return true;
                          }
                          return false;
                        }
                      ),
                      tap(
                        {
                          next: (response)=>{
                                  console.log("Return on Login: ", response);
                                }
                        }
                      )
                    );
  }

  logout(){
    localStorage.removeItem('token');
  }

  isUserLoggedIn(): boolean{
    let token = localStorage.getItem('token');
    let expiryDate;
    let userLoggedIn: boolean = false;
    let isTokenExpired: boolean = true;

    if(token!=null){
      //expiryDate = this.jwtHelperService.getTokenExpirationDate(token);

      isTokenExpired = this.jwtHelperService.isTokenExpired(token);
      //if a token is expired it will return true hence '!'

      userLoggedIn = !isTokenExpired;

      if(isTokenExpired){
        console.log(
                  "[AuthSevice] Logged-In User's token expired? ",
                  isTokenExpired,
                  "Hence, removing token from localStorage."
                );
        localStorage.removeItem('token');
      }
    }
    return userLoggedIn;
  }

  getLoggedUser(): LoggedInUser|null {
    let token = localStorage.getItem('token');
    if(token!=null){
      let decodedToken = this.jwtHelperService.decodeToken(token);
      let loggedInUser = new LoggedInUser(
                            decodedToken.username,
                            decodedToken.firstName,
                            (decodedToken.roles as string[])
                          );
      return loggedInUser;
    }
    return null;
  }

  getUsername(): string | null{
    let token = localStorage.getItem('token');
    if(token!=null){
      let decodedToken = this.jwtHelperService.decodeToken(token);
      return decodedToken.username;
    }
    return null;
  }

  getFirstName(): string | null{
    let token = localStorage.getItem('token');
    if(token!=null){
      let decodedToken = this.jwtHelperService.decodeToken(token);
      return decodedToken.firstName;
    }
    return null;
  }

}
