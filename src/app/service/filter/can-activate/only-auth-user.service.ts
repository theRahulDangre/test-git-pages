import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyAuthUser implements CanActivate {

  private previousRouteURL: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    //getting previous route url
    //so that user can be redirect to page where it came from
    router.events
          .pipe(
            filter(event => { return event instanceof NavigationEnd })
          )
          .subscribe(
            {
              next: (event)=>{
                      this.previousRouteURL = (event as NavigationEnd).url;
                    }
            }
          );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(
                    ['/login'],
                    {
                      queryParams: {
                                    //sate.url returns url for which
                                    //this filter is applied.
                                    returnUrl: state.url
                                  }
                    }
                  );
    return false;
  };
}
