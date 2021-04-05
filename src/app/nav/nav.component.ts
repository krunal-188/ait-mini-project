import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { NewsRss } from '../feed/news-rss';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  RssData: NewsRss;
  constructor(private authservice: AuthService, private http: HttpClient) { }
  ngOnInit(): void {
  }
  GetRssFeedData() {
    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };
    this.http.get("https://gadgets.ndtv.com/rss/feeds", requestOptions).subscribe(data => {
      let parseString = xml2js.parseString;
      parseString(data, (err, result: NewsRss) => {
        this.RssData = result;
      });
    });
    return this.RssData;
  }
}
