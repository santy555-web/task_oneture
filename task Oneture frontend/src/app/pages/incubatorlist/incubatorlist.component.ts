import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { ApiConstant } from 'src/app/_services/app-constant.enum';

@Component({
  selector: 'app-incubatorlist',
  templateUrl: './incubatorlist.component.html',
  styleUrls: ['./incubatorlist.component.css']
})
export class IncubatorlistComponent implements OnInit {

  constructor(private httpClient: HttpClient,private _router: Router, private notifyService : NotificationService) { }
  dataSource= [];
  ngOnInit(): void {
    this.init()
  }
  init()
  {
    this.loadData();
  }
  loadData(apiURL?: string, params?: any) {
    const url = ApiConstant.getFormURL;
    this.httpClient.get(url).subscribe((data: any) => {
      if(data !=null)
      {
      this.dataSource = data.userResponce;
       // console.log(this.dataSource);
      //this.notifyService.showSuccess("Data Load successfully !!", "");
      }
      else{
        this.notifyService.showWarning("Something is wrong !!", "")
      }
  })
  }
  onClick(item)
  {
    this._router.navigate(['/incubatorspec', item.id]);
  }

  onDeleteClick(item) {
    const url1 = ApiConstant.deleteFormURL;
    console.log(url1+item.id);

    this.httpClient.get(url1+item.id).subscribe((data: any) => {
      if(data !=null)
      {
        location.reload();
      this.notifyService.showSuccess("Deleted successfully !!", "");
      }
      else{
        this.notifyService.showWarning("Something is wrong !!", "")
      }
  })
  }
}
