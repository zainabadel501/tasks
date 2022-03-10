import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { AngularFireStorage , AngularFireStorageReference , AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map , finalize } from 'rxjs/operators';

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
  randomId = Math.random().toString(36).substring(2);
  public isToggle=true;
  path:string="";  
  user={
    fullname : "",
    email:"",
    password:"",
    major:"",
    profile_img:{}
  }


  
  majors:major[]=[
    {value: 'Business-0', viewValue: 'business'},
    {value: 'Art-1', viewValue: 'Art'},
    {value: 'Math-3', viewValue: 'Math'},
    {value: 'Science-4', viewValue: 'Science'},
    {value: 'Education-5', viewValue: 'Education'},
    {value: 'English-6', viewValue: 'English'}

  ];

    // selectedmajer:string="";
 
  constructor(public newuser : DataService , private router: Router , private af: AngularFireStorage) { }
  public newUserform !: FormGroup;
  ngOnInit(): void {
    this.newUserform=this.newuser.userform;
  }


  post(){
    this.user.fullname=this.newuser.userform.value.fullname;
    this.user.email=this.newuser.userform.value.email;
    this.user.password=this.newuser.userform.value.password;
    this.user.major=this.newuser.selectedmajer;
    this.user.profile_img=this.randomId;
    // typeof(this.user.profile_img);
    this.uploadimg();
    this.newuser.createUser(this.user);

  }

  ref !: AngularFireStorageReference;
  task !: AngularFireUploadTask;
  
  

  uploadimg(){

    
  //  this.af.upload("/files"+Math.random()+this.path,this.path);
   this.ref = this.af.ref('/files/' + this.randomId);
   this.task = this.ref.put(this.path);
  //  this.downloadURL = this.ref.getDownloadURL();
  
  //  this.newuser.downloadURL=this.af.ref('/files/' + this.newuser.loginuser+'.jpg').getDownloadURL();
  //  this.task.snapshotChanges().pipe(
  //   finalize(() => this.downloadURL = this.ref.getDownloadURL())
  // )
  // .subscribe( res =>{
  //   console.log(this.downloadURL);
  // });
   
  
  }

  Upload($event:any){
    this.path=$event.target.files[0];
 


  }



}
