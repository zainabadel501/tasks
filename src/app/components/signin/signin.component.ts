import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Observable , of, tap } from 'rxjs';
import { user } from 'src/app/model/user';





@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


    

   user$ !:Observable<user>;
  //  user !: user;
   msg:string="";
   userdata={
     email:"",
     password:""
   }

  

  constructor(public loginuserform : DataService , private router: Router) { }
  public loginform !: FormGroup;
  ngOnInit(): void {
    this.loginform=this.loginuserform.userform;
  }

 

  logIn(){

     this.userdata.email=this.loginform.value.email;
    this.userdata.password=this.loginform.value.password;
    console.log(this.userdata);
    this.loginuserform.logIn(this.userdata);
    // this.user$=this.loginuserform.logIn(this.userdata).pipe(
    //   tap(user=>{
    //     if (user) {
    //       this.msg = 'success';
    //     } else {
    //       this.msg = 'User with this email does not exist!';
    //     }

    //   })
    // );

    this.user$=this.loginuserform.logIn(this.userdata).pipe(
    tap( user=>{
      if (user) {
              this.msg = 'success';
              this.loginuserform.userSignin=true;
              console.log(user);
            } else {
              this.msg = 'User with this email does not exist!';
            }

    })
    );
    console.log(this.user$);

    
    

  }



}
