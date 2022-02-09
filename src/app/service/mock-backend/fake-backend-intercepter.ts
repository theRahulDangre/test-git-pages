import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, dematerialize, materialize, mergeMap, Observable, of } from "rxjs";

import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedInUser } from "src/app/binding/logged-in-user";

@Injectable()
export class FakeBackEndInterceptor implements HttpInterceptor{

  private jwtHelperService: JwtHelperService;

  constructor(){
    this.jwtHelperService = new JwtHelperService();
  }


  intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>>
  {
    let jwtHelper: JwtHelperService = this.jwtHelperService;
    let jwtToken = '';

    //setting constant from 'req' Obj into local constant
    const {url, method, headers, body} = req;

    let x: number = 0;

    /**returning Observable using 'of()'
    * But I dont know how it works
    * https://jasonwatmore.com/post/2020/07/18/angular-10-fake-backend-example-for-backendless-development
    * according to website
    * creating an observable to simulate delayed sever call,
    */
    return of(null)
              .pipe(
                mergeMap(
                  (value,index)=>{
                    return handleRoute();
                  }
                )
              )
              .pipe(materialize())
              .pipe(delay(2000))
              .pipe(dematerialize());




    function handleRoute(): Observable<HttpEvent<any>>{

      //select case who's condition return TRUE
      /**
      * whichever first case gets matched will be returned.
      * hence need to place 'case' in such a way.
      */
      switch (true){
        case (url.endsWith('/api/authenticate') && method === "POST"):{
              return authenticate();
            }
        case (url.endsWith('api/orders') && method==="GET"):{
              return orders();
            }
        default:{
                  return next.handle(req);
                }
      }
    }

    function authenticate(): Observable<HttpEvent<any>> {
      const { username, password } = JSON.parse(body);

      if(
          username=='rahul@gmail.com'
            &&
          password=='1234'
      ){
        jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJyYWh1bEBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJSYWh1bCIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNjcyNTMxMjAwLCJyb2xlcyI6WyJVU0VSIiwiQURNSU4iXX0.PQjuJ0fES431iOIgR4r9T09UJTl6J07Q92-TmqxbwJ0';
        return of(new HttpResponse({
                  body: {
                    token: jwtToken
                  },
                  status: HttpStatusCode.Ok
                }));
      }
      else if(
          username=='user1@gmail.com'
            &&
          password=='1234'
      ){
        jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNybmFtZSI6InVzZXIxQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IlVzZXIxIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2NDA5OTUyMDAsInJvbGVzIjpbIlVTRVIiXX0.ZdeEQwM5nxOZEjCs6fnwtVI3qTvT1t55ajLW5iwnjaY';
        return of(new HttpResponse({
          body: {
            token: jwtToken
          },
          status: HttpStatusCode.Ok
        }));
      }
      else if(
        username=='user2@gmail.com'
          &&
        password=='1234'
      ){
        jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJ1c2VyMkBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJVc2VyMiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNjcyNTMxMjAwLCJyb2xlcyI6WyJVU0VSIl19.x3G6JKtR5xZTgUTYPptaCrxTi16jgF0DxALRdXFfp1Q';
        return of(new HttpResponse({
          body: {
            token: jwtToken
          },
          status: HttpStatusCode.Ok
        }));
      }
      else{
          return of(new HttpResponse({
                  body:{
                    error: 'Invalid Credentials'
                  },
                  status: HttpStatusCode.NotAcceptable
                }));
        }
    }

    function orders(): Observable<HttpEvent<any>>{

      if(
        headers.get('Authorization')?.startsWith('Bearer ')
      ){
        let token = headers.get('Authorization')?.substring(7);
        let decodedToken = jwtHelper.decodeToken(token);
        if(decodedToken){
          let loggedUser = new LoggedInUser(
            decodedToken.username,
            decodedToken.firstName,
            (decodedToken.roles as string[])
          );

          if(loggedUser.hasAnyRole(["ADMIN"])){
            //SUCCESS RESPONSE
            return of(
                        new HttpResponse(
                          {
                            body:{
                            orders: [1,2,3,4]
                            },
                            status: HttpStatusCode.Ok
                          }
                        )
                      );
          }
          else{
            return of(
              new HttpResponse(
                {
                  body:{
                    error: 'User is not Authorized'
                  },
                  status: HttpStatusCode.Unauthorized
                }
              )
            );
          }
        }
      }

      //UNAUTHORIZED RESPONSE
      return of(
                new HttpResponse(
                  {
                    body:{
                      error: 'Not a valid JWT'
                    },
                    status: HttpStatusCode.Unauthorized
                  }
                )
              );

    }
  };
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackEndInterceptor,
  multi: true
};
