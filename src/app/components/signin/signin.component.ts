import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Observable , of, tap } from 'rxjs';
import { user } from 'src/app/model/user';
import { AngularFireStorage } from '@angular/fire/compat/storage';




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


    
  
   defaultimg='blank-profile-picture.png';
   user$ !:Observable<user>;
  //  user !: user;
   msg:string="";
   userdata={
     email:"",
     password:""
   }



 

  

  constructor(public loginuserform : DataService , private router: Router , private af: AngularFireStorage) { }
  public loginform !: FormGroup;
  ngOnInit(): void {
    this.loginform=this.loginuserform.userform; 
    console.log(this.loginuserform.isLogIn);
    this.checklogin();
    

  }

 

  logIn(){

     this.userdata.email=this.loginform.value.email;
    this.userdata.password=this.loginform.value.password;
    console.log(this.userdata);
    this.loginuserform.logIn(this.userdata);


    this.user$=this.loginuserform.logIn(this.userdata).pipe(
    tap( user=>{
      if (user) {
              this.msg = 'success';
              this.loginuserform.userSignin=true;
              this.loginuserform.downloadURL=this.af.ref('/files/' + user.profile_img).getDownloadURL();
              JSON.parse(localStorage.getItem('user')!);
              
            } else {
              this.msg = 'User with this email does not exist!';
            }

    })
    );

    // let data = JSON.parse(localStorage.getItem(user));
   

  }

  LogOut(){
    this.loginuserform.userSignin=false;
    localStorage.clear();
  }

  checklogin(){
    this.loginuserform.userSignin=this.loginuserform.isLogIn;
    if (this.loginuserform.isLogIn !== false){
      this.loginuserform.downloadURL=this.af.ref('/files/' + this.loginuserform.userdata.profile_img).getDownloadURL();
    }
  }

  onError(){
    
    this.loginuserform.downloadURL=this.af.ref('/files/' + this.defaultimg).getDownloadURL();

  }



}
