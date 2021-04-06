import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username:String;
  user_id: String;
  constructor(private authservice: AuthService, private http: HttpClient, private route:Router) { }
  ngOnInit(): void {
    if (!this.authservice.isLoggedin())
    {
      localStorage.removeItem('token');
      this.route.navigate(['/login']);
    }
    this.username=this.authservice.currentUser.username;
    this.user_id=this.authservice.currentUser.userId;
  }

  lout(){
    this.authservice.logout();
  }
  
  // feed() {
  //   // var name = JSON.stringify(degree_type);
  //   const headers = new HttpHeaders().set('Content-Type', 'application/xml');
  //   return this.http.get('https://www.indiaeducation.net/rss/alertsengineering.xml')
  //     .pipe(map((response: any) => {
  //       let result = response;
  //       console.log(result);        
  //         return result;
  //     }));
  // }
}
