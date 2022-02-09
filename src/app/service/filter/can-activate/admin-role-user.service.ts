import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleUser implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      let loggedUser = this.authService.getLoggedUser();
      if(loggedUser!=null && loggedUser.hasAnyRole(["ADMIN"])){
        return true;
      }
    this.router.navigate(['/accessDenied']);
    return false;
  }

  // static havingRole(roles: string[]): CanActivate{
  //   return new class implements CanActivate{
  //             canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

  //               return false;
  //             }
  //           }
  // }
}
