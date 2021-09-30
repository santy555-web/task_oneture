import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxShimmerLoadingModule } from  'ngx-shimmer-loading';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'node_modules/ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { IncubatorlistComponent } from './pages/incubatorlist/incubatorlist.component';
import { SpecificincubatorComponent } from './pages/specificincubator/specificincubator.component';
import { CantactComponent } from './admin/cantact/cantact.component';
import { ServicesComponent } from './admin/services/services.component';
import { AboutComponent } from './admin/about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,
    AdmindashboardComponent,
    UserdashboardComponent,
    NavbarComponent,
    RegisterComponent,
    IncubatorlistComponent,
    SpecificincubatorComponent,
    CantactComponent,
    ServicesComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxShimmerLoadingModule,
    BrowserAnimationsModule
  ],
  providers: [ AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
