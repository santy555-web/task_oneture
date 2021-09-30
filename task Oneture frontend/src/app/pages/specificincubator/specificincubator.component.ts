import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { ApiConstant } from 'src/app/_services/app-constant.enum';

@Component({
  selector: 'app-specificincubator',
  templateUrl: './specificincubator.component.html',
  styleUrls: ['./specificincubator.component.css']
})
export class SpecificincubatorComponent implements OnInit {
  dataSource= [];
  id;
  constructor(private httpClient: HttpClient,private _router: Router, private _actroute:ActivatedRoute,private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.id=this._actroute.snapshot.params['id'];
    this.init()
  }

  init()
  {
    this.loadData();
  }
  loadData(apiURL?: string, params?: any) {
    const url = ApiConstant.getFormByIdURL;

    console.log(this.id);
    this.httpClient.get(url+this.id).subscribe((data: any) => {
      if(data !=null)
      {
      this.dataSource = data.userResponce;
        console.log(this.dataSource);
      this.notifyService.showSuccess("Data Load successfully !!", "");
      }
      else{
        this.notifyService.showWarning("Something is wrong !!", "")
      }
  })
  }

}
