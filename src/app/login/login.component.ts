import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ImagePath:  string;
  invalidLogin: boolean;
  constructor(private router:Router, private authService:AuthService, private renderer:Renderer2) { 
    this.ImagePath="/assets/img/img-01.png";
  }
  signIn(credentials){
    this.authService.login(credentials).subscribe(result=>{
      if(result)
        this.router.navigate(['/home']);
      else
      this.invalidLogin = true;
    })

  }
log(x){
  console.log(x);
}
renderExternalScript(src: string): HTMLScriptElement {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.async = true;
  script.defer = true;
  this.renderer.appendChild(document.body, script);
  return script;
}
  ngOnInit(): void {
    var ExternalScripts: string[];
    ExternalScripts=[
    './../../assets/vendor/bootstrap/js/popper.js',
    './../../assets/vendor/bootstrap/js/bootstrap.min.js',
    './../../assets/vendor/tilt/tilt.jquery.min.js',
    './../../assets/vendor/select2/select2.min.js',
    './../../assets/vendor/jquery/jquery-3.2.1.min.js'];
    for(let i=0;i<ExternalScripts.length;i++){
      this.renderExternalScript(ExternalScripts[i]).onload = () => {
        console.log('External script added');
        // do something with this library
      }
    }
    
  }

}
