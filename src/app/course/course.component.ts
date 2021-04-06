import { DataserviceService } from './../_services/dataservice.service';
import { Router } from '@angular/router';
import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {
  title = 'angulardatatables';
  private sub: any;
  data:any;
  maxlength: number;
  private degree_type: any;
  dataSource:MatTableDataSource<any>;
  displayedColumns: string[] = ['Name','Course','Description','Fee','Duration','Location'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router:Router,private dataService:DataserviceService,private route: ActivatedRoute) { }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showAll(length) {
    this.maxlength=length;
  }
  hideAll(length) {
    this.maxlength=20;
  }
  ngOnInit(): void {
    this.maxlength=20;
    this.sub = this.route.params.subscribe(params => {
      this.degree_type = params['degree_type'];
      console.log(this.degree_type);
      console.log("Krunal");
      this.dataService.getdata(this.degree_type).subscribe(result=>{
          this.data = result;
          console.log(this.data);
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      })
   });
  }
}
