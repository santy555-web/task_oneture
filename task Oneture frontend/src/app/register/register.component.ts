import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { registerService } from "../../app/_services/registrationService";
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Register: any []=[];
  age;
  signupForm: FormGroup;
  constructor(private _data:registerService,private notifyService : NotificationService,private _router: Router) { }

  ngOnInit(): void {
    this.signupForm =  new FormGroup({
      title: new  FormControl(""),
      name: new  FormControl(null, [Validators.required]),
      address: new  FormControl(),
      gender:  new FormControl("Male"),
      dob: new  FormControl(null, [Validators.required]),
      age: new  FormControl(),
      mobile: new  FormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ]),
      personal_email:  new  FormControl(null, [Validators.email,Validators.required ]),
      official_email:  new  FormControl(null, [Validators.email ]),
      ideaDescription : new  FormControl(),
      componyRevenues : new  FormControl(),
      teamDescription : new  FormControl(),
      productDescription  : new  FormControl(),
      customerDescription : new  FormControl(),
      CompetitorsDescription : new  FormControl(),
      advantegesDescription : new  FormControl(),
      selfDecision: new  FormControl()
    });

    this.signupForm.get('dob').valueChanges.subscribe((x)=>this.AgeCalculation(x));
  }


  //this method is for submit data
  onRegister()
  {
    this._data.addForm(this.signupForm.value).subscribe((data:any) => {
      if(data !=null)
      {
      this.notifyService.showSuccess("Added Successfully !!", "Thank You For Your Responce!!");
      this._router.navigate(['/userdashboard']);
      }
      else{
        this.notifyService.showError("Something went wrong !!", "");
      }
    });
  }


//Age calculation
AgeCalculation(val: Date){
  var today = new Date();
  var year= today.getFullYear();
  var birthDate= new Date(val).getFullYear();
  var a=year-birthDate;
  this.age=a;
 // console.log(this.age);
}



//file uplode in array
onFileSelected(event) {

  if (event.target.files){

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event:any ) =>
      {
        this.Register.push(event.target.result);
      }
  }
  }

//this method is disbled upt dta is not present in array
  OnNextClick()
   {
    if( this.Register.length ==0)
    {
      return true;
    }
   }

}
