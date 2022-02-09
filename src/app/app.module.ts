import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth-service/auth.service';
import { fakeBackendProvider } from './service/mock-backend/fake-backend-intercepter';
import { OrderService } from './service/order-service/order.service';
import { OnlyAuthUser } from './service/filter/can-activate/only-auth-user.service';
import { NonAuthUser } from './service/filter/can-activate/non-auth-user.service';
import { AdminRoleUser } from './service/filter/can-activate/admin-role-user.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ProfileComponent } from './profile/profile.component';


export function tokenGenrator(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    AccessDeniedComponent,
    PageNotFoundComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot(
      {
        config:{
          tokenGetter: tokenGenrator,
          allowedDomains: ["/api"]
        }
      }
    ),
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {path:'', component:HomeComponent},
        {
          path:'admin',
          component:AdminComponent,
          canActivate: [
                        OnlyAuthUser, AdminRoleUser
                      ]
        },
        {
          path:'login',
          component:LoginComponent,
          canActivate: [
                        NonAuthUser
                      ]
        },
        { path:'profile',
          component: ProfileComponent,
          canActivate: [
                        OnlyAuthUser
                      ]
        },
        {path:'accessDenied', component:AccessDeniedComponent},
        {path:'**', component:PageNotFoundComponent}
      ]
    )
  ],
  providers: [
    AuthService,
    OrderService,

    //CanActivate_IMPL
    OnlyAuthUser,
    NonAuthUser,
    AdminRoleUser,

    //Route Interceptor_IMPL
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
