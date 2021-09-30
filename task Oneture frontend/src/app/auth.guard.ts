import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  constructor(private _router:Router){}
  canActivate(): boolean
  {
    if(sessionStorage.getItem('token')!=null)
    {
      this.loggedIn.next(true);
      return true;
    }
    else
    {
      alert('Please Login First!...');
      this._router.navigate(['/']);

      return false;
    }
  }


  logout() {
    this.loggedIn.next(false);
    window.sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}
