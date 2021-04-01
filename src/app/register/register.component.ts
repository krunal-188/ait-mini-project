import { Router} from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {

  invalidLogin: boolean;
  constructor(private router:Router, private authService:AuthService) { 
  }
  signUp(credentials){
    this.authService.signup(credentials).subscribe(result=>{
      if(result){
        console.log(result);
        this.router.navigate(['/login']);
      }
        
      else
      this.invalidLogin = true;
    })
  }
  log(x){
    console.log(x);
  }
  ngOnInit(): void {
  }
}
