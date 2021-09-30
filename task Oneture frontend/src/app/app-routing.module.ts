import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { RegisterComponent } from "./register/register.component";
import { IncubatorlistComponent } from './pages/incubatorlist/incubatorlist.component';
import { SpecificincubatorComponent } from './pages/specificincubator/specificincubator.component';
import { CantactComponent } from './admin/cantact/cantact.component';
import { ServicesComponent } from './admin/services/services.component';
import { AboutComponent } from './admin/about/about.component';
 const routes: Routes = [

  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admindashboard',canActivate:[AuthGuard],component: AdmindashboardComponent},
  { path: 'admincantact',canActivate:[AuthGuard],component: CantactComponent},
  { path: 'adminservices',canActivate:[AuthGuard],component: ServicesComponent},
  { path: 'adminabout',canActivate:[AuthGuard],component: AboutComponent},
  { path: 'incubatorlist',canActivate:[AuthGuard],component: IncubatorlistComponent},
  { path: 'incubatorspec/:id',canActivate:[AuthGuard],component: SpecificincubatorComponent},
  { path: 'userdashboard',component: UserdashboardComponent},
  { path: '**',canActivate:[AuthGuard],component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
