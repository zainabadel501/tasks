import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

interface major  {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {
  
  public isToggle=true;
  user={
    fullname : "",
    email:"",
    password:"",
    // major:"",
    profile_img:"" 
  }
  
  majors:major[]=[
    {value: 'Business-0', viewValue: 'business'},
    {value: 'Art-1', viewValue: 'Art'},
    {value: 'Science-2', viewValue: 'Science'},
  ];
 
  constructor(public newuser : DataService , private router: Router) { }
  public newUserform !: FormGroup;
  ngOnInit(): void {
    this.newUserform=this.newuser.userform;
  }

  post(){
    this.user.fullname=this.newuser.userform.value.fullname;
    this.user.email=this.newuser.userform.value.email;
    this.user.password=this.newuser.userform.value.password;
    // this.user.major=this.newuser.userform.value.major;
    // this.user.profile_img="src\assets\blank-profile-picture.png";
    // console.log(this.user);
    // this.newuser.uploadimg(this.user.profile_img);
    this.newuser.createUser(this.user);

  }

  Upload($event:any){
    this.user.profile_img=$event.target.files[0];

    // search in google about $event classes and methods
    // if($event.empty){
    //   this.user.profile_img="src\assets\blank-profile-picture.png";
    // }

  }

}
