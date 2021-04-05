import { DataserviceService } from './../_services/dataservice.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {
  title = 'angulardatatables';
  private sub: any;
  data:any;
  private degree_type: any;
  constructor(private router:Router,private dataService:DataserviceService,private route: ActivatedRoute) { }
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.degree_type = params['degree_type'];
      console.log(this.degree_type);
      console.log("Krunal");
      this.dataService.getdata(this.degree_type).subscribe(result=>{
          this.data = result;
          console.log(this.data);
      })
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };  
      // In a real app: dispatch action to load the details here.
   });
  }
}
