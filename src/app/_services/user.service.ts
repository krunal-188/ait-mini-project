import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  userfetch(user_id){
    let url='api/findfirst/'+user_id;
    console.log(url);
    return this.http.post(url,{})
    .pipe(map((response: any)=>{
      let result = response;
      console.log(result);
      if(result.message =="User Fetched"){
      return result.data;
    }
    }));
  }
  userupdate(credentials){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post('api/update',JSON.stringify(credentials),{headers:headers})
    .pipe(map((response: any)=>{
      let result = response;
      console.log(result);
      if(result.message=="User Updated"){
      return true;
    }
      return false;

    }));
  }
  userphotoupdate(image,id){
    const photodata=new FormData();
    photodata.append("id",id);
    photodata.append("image",image,id);
    return this.http.post('api/uploadphoto',photodata)
    .pipe(map((response: any)=>{
      let result = response;
      console.log(result);
      return result;
    }));
  }
  deleteuserphoto(user_id){
    let url='api/deleteUserPhoto/'+user_id;
    console.log(url);
    return this.http.post(url,{})
    .pipe(map((response: any)=>{
      let result = response;
      console.log(result);
      return result;
    }));
  }
}
