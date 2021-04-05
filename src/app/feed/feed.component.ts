import { Component, OnInit } from '@angular/core';
import { NavComponent } from './../nav/nav.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  constructor(private nav:NavComponent) { }
  
  ngOnInit(): void {
  }
  // GetRssFeedData(){
  //   this.nav.GetRssFeedData().subscribe(result=>{
  //     if(result)
  //       // this.router.navigate(['/home']);
  //   })

  // }
}
