import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private route:Router) { }
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
    this.route.navigate(['/login']);

  }
  isLoggedin(){
    let jhelper= new JwtHelperService();
    let token=localStorage.getItem('token');
    if(!token)
    return false;
    let isExpired=jhelper.isTokenExpired(token);
    return !isExpired;
  }
  get currentUser(){
    let token=localStorage.getItem('token');
    if(!token)
    return null;
    let jhelper= new JwtHelperService();
    return jhelper.decodeToken(token);

  }
}
