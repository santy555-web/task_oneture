import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth.guard';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthGuard) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }


  onLogout(){
    this.authService.logout();
  }

}
