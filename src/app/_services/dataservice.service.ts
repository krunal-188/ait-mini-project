import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsRss } from '../feed/news-rss';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  RssData: NewsRss;
  // feed_data:NewRss;
  public xmlItems: any;
  constructor(private http: HttpClient) { }
  getdata(degree_type) {
    // var name = JSON.stringify(degree_type);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/course/display', { "degree_type": degree_type }, { headers: headers })
      .pipe(map((response: any) => {
        let result = response;
        // console.log(result);        
        return result;
      }));
  }
  }

