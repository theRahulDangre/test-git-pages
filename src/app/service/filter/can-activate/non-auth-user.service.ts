import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthUser implements CanActivate {

  private previousRouteURL: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(!this.authService.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(['/']);
    return false;
  };

}
