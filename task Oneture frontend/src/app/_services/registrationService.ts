import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Incubator } from '../pages/classData/incubatorClass';
import { ApiConstant } from "./app-constant.enum";

@Injectable({
  providedIn: 'root'
})
export class registerService {
    url1=ApiConstant.getFormURL;
    url2=ApiConstant.getFormByIdURL;
    url3=ApiConstant.addFormURL;
    url4=ApiConstant.deleteFormURL;
  constructor(private data:HttpClient) { }

    getForm() {
    return this.data.get<Incubator[]>(this.url1);
    }
    getFormById(id) {
      return this.data.get(this.url2+id);
    }

    addForm(items:Incubator) {
      let head = new HttpHeaders().set('Content-Type','application/json');
      let body=JSON.stringify(items);
      console.log(body);
      return this.data.post(this.url3, body, {headers:head}  );
    }

    deleteForm(id)
    {
      let head = new HttpHeaders().set('Content-Type','application/json');
      return this.data.delete(this.url4+id, {headers:head} );
    }

}
