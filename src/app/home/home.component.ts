import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private renderer:Renderer2, private router:Router) { }
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
    './../../assets/js/jquery-3.2.1.slim.min.js',
    './../../assets/js/popper.min.js',
    './../../assets/js/bootstrap.min.js'
  ];
    for(let i=0;i<ExternalScripts.length;i++){
      this.renderExternalScript(ExternalScripts[i]).onload = () => {
        console.log('External script added');
        // do something with this library
      }
    }
  }

}
