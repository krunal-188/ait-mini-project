import { UserService } from './../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user_id:any;
  private sub: any;
  data :any;
  updatemsg:any
  constructor(private router: Router, private route:ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.user_id = params['user_id'];
      console.log(this.user_id);
      this.userService.userfetch(this.user_id).subscribe(result=>{
        this.data = result;
        console.log(this.data);
    })
  });
}
userupdate(credentials){
this.userService.userupdate(credentials).subscribe(result=>{
  if(result){
    console.log(result);
    this.updatemsg="User Updated";
  }
})
}
log(x){
  console.log(x);
}
}
