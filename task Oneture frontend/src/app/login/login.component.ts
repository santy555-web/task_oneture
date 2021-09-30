import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { AuthenticationService } from '../_services/index';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthenticationService,public router: Router,private notifyService : NotificationService) { }
  public userName: string = 'Santosh';
  public password: string = '123456';
  public warningMessage: string;

  ngOnInit(): void {
  }
  onLogIn() {

    if(!this.userName || !this.password){
      this.warningMessage = 'Please Enter Login Details';
    }else{

      this.authService.login(this.userName, this.password)
        .subscribe(res => {
          console.log(res.id);
          if(res.status==true){
            var token = res.token;
            if(res.token) {
               sessionStorage.setItem('token', res.token);
             }
            this.notifyService.showSuccess("Login successfully !!", "");
           // history.pushState(null, null, window.location.href);
            this.router.navigate(['/admindashboard']);
          }else{
            this.notifyService.showError("Invalid Credentials !!", "")
          }

          }, error => {
           //console.log(error)
          this.notifyService.showError("Something went wrong!!...", "")
        });
    }
  }

}
