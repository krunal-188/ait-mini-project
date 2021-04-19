import { UserService } from './../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user_id:any;
  private sub: any;
  data :any;
  updatemsg:any;
  imageData: string;
  imageflag:boolean=false;
  form: FormGroup;
  selectedFile:File;
  constructor(private router: Router, private route:ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl(null),
    });
    this.sub = this.route.params.subscribe(params => {
      this.user_id = params['user_id'];
      console.log(this.user_id);
      this.userService.userfetch(this.user_id).subscribe(result=>{
        this.data = result;
        if(this.data.imagepath!=null){
          this.imageflag=true;
          this.imageData=this.data.imagepath;
        }
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
OnImageUpload(event){
  const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
        this.imageflag=true;
      };
      reader.readAsDataURL(file);
    }
}

photoupdate(){
  this.userService.userphotoupdate(this.form.value.image,this.user_id).subscribe(result=>{
    if(result.message=="User Photo Updated"){
      console.log("Uploaded the photo in mongodb and folder");
      this.imageData=result.data.imagepath;
    }
  });
}
photodelete(){
  this.userService.deleteuserphoto(this.user_id).subscribe(result=>{
    if(result.message=="Successfully Deleted"){
      console.log(result);
      this.imageflag=false;
    }
  })
}
log(x){
  console.log(x);
}
}
