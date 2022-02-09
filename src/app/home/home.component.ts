import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth-service/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title_background_color: string;

  private _isUserLoggedIn: boolean;
  firstName: string | null = null;
  username: string | null = null;

  constructor(
    private authService: AuthService
  ) {
    console.log("[HOME] initializing.. checking if UserIsLogged.");
    this._isUserLoggedIn = authService.isUserLoggedIn();

    if(this._isUserLoggedIn){
      this.firstName = authService.getFirstName();
      this.username = authService.getUsername();
    }

    this.title_background_color = environment.title_background;
  }

  ngOnInit(): void {
  }

  get isUserLoggedIn(): boolean{
    return this._isUserLoggedIn;
  }

  userOfAnyRole(roles: string[]):boolean{
    let loggedUser = this.authService.getLoggedUser();
    return loggedUser!=null ? loggedUser.hasAnyRole(roles) : false;
  }

  logoutUser(){
    this.authService.logout();
    this._isUserLoggedIn = false;
    this.firstName = null;
    this.username = null;
  }


}
