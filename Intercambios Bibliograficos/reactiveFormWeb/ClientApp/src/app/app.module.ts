import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LogInterceptorService } from './services/log-interceptor.service';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AccountService } from './account/account.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { FetchMaterialComponent } from './fetchmaterial/fetchmaterial.component';
import { ShowMaterialComponent } from './showmaterial/showmaterial.component';
import { creatematerial } from './addmaterial/addmaterial.component';
import { createdireccion } from './addmaterial/adddirection.component';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FetchMisMaterialComponent } from './fetchmismaterial/fetchmismaterial.component';
import { MaterialService } from './services/matservice.service';
import { MaterialFilterPipe } from './fetchmaterial/material-filter.pipe';
import { LoginComponent } from './account/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    FetchMaterialComponent,
    MaterialFilterPipe,
    FetchMisMaterialComponent,
    ShowMaterialComponent,
    creatematerial,
    createdireccion
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDkWlS6zmJIjW0Rq1Rmor15q70J4NOCOSk' }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
     
      { path: 'login', component: LoginComponent },
      { path: 'register-login', component: RegisterComponent },
      { path: 'fetch-material', component: FetchMaterialComponent },
      { path: 'mis-materiales/:Email', component: FetchMisMaterialComponent, canActivate: [AuthGuardService] },
      { path: 'register-material-direccion', component: createdireccion, canActivate: [AuthGuardService] },
      { path: 'register-material/:puntoLat/:puntoLng', component: creatematerial, canActivate: [AuthGuardService] },
      { path: 'material/edit/:id', component: creatematerial },
      { path: 'material/details/:id/:puntoLat/:puntoLng', component: ShowMaterialComponent }

    ])
  ],
  providers: [MaterialService, GoogleMapsAPIWrapper, AuthGuardService, AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
