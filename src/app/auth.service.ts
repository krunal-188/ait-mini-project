import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';
// localStorage.setItem('token',result.token);
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(credentials){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    console.log(JSON.stringify(credentials));
    return this.http.post('http://localhost:3000/api/authenticate',JSON.stringify(credentials),{headers:headers})
    .pipe(map((response: any)=>{
      let result = response;
      console.log(result);
      if(result.message=="User Authenicated"){
      localStorage.setItem('token',result.token);
      return true;
    }
      return false;

    }));
  }
  signup(credentials){
    console.log(JSON.stringify(credentials));
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/signup',JSON.stringify(credentials),{headers:headers})
    .pipe(map((response: any)=>{
      let result = response;
      console.log(result);
      if(result.message =="User Created"){
      return true;
    }
      return false;

    }));
  }

  logout(){
    localStorage.removeItem('token');
  }
  isLoggedin(){

  }
}
