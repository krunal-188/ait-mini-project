import { DataserviceService } from './../_services/dataservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as xml2js from 'xml2js';
import { NewsRss } from '../feed/news-rss';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  constructor(private router:Router,private dataService:DataserviceService,private route: ActivatedRoute,private http: HttpClient) { 
    // this.GetRssFeedData();
  }
  data:any;
  RssData: NewsRss;
  sub:any;
  feed_type:any;
  feed_data :any;
  public xmlItems: any;
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.feed_type = params['feed_type'];
      console.log(this.feed_type)
    this.data = this.GetRssFeedData(this.feed_type)
    // .subscribe(result=>{
    //       this.feed_data = result;  
          // this.router.navigate(['/home']);
    })
    // this.data = this.GetRssFeedData()
  }
  GetRssFeedData(feed_type) {
    let parseString = xml2js.parseString;
    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };
    console.log(feed_type);
    return this.http.get("./../../assets/"+this.feed_type+".xml", {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/xml')
        .append('Access-Control-Allow-Methods', 'GET')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
      responseType: 'text'
    }).subscribe((data) => {
      // console.log("harhs"); 
      this.parseXML(data)
        .then((data) => {
          // console.log("hiaijdff");
          this.xmlItems = data;
          console.log(data);
          return this.xmlItems;
        });
    });
    //   .pipe(map((data:any)=> {
    //     // this.RssData = data;
    //     parseString(data, (err, result: NewsRss) => {
    //       this.RssData = result;
    //       console.log(this.RssData);

    //     });
    //     return this.RssData;
    // })); 

  }
  parseXML(data) {
    // console.log(data);
    return new Promise(resolve => {
      var k: string | number,
        arr = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err, result) {
        // console.log(result);
        
        
        var obj = result.rss.channel;
        // console.log(obj);
        console.log("hi");
        // console.log(obj[0].item);
        
        for (k in obj[0].item) {
          var news = obj[0].item[k];
          
          arr.push({
            title: news.title[0],
            link: news.link[0],
            description: news.description[0],
            pubDate: news.pubDate[0]
          });
        }
        // console.log(arr);
        resolve(arr);
      });
    });
  }

}
  // GetRssFeedData(){
  //   this.nav.GetRssFeedData().subscribe(result=>{
  //     if(result)
  //       // this.router.navigate(['/home']);
  //   })

  // }
  
