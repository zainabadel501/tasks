import { Injectable } from '@angular/core'; 
import { user } from 'src/app/model/user';
import { AngularFirestore , AngularFirestoreDocument } from '@angular/fire/compat/firestore/';
import { map , find } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup , Validators  } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  update:boolean= false;
  userSignin:boolean=false;
  taskData:any;
  userdata : any;
  emailpattern:string="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  selectedmajer:string="";
  downloadURL !: Observable<user>;
  fulDate:string="";
  
  

  



  constructor( private firestore: AngularFirestore , private http : HttpClient , private router: Router , private af: AngularFireStorage ) {}
    form = new FormGroup({        
        title : new FormControl('', Validators.required),
        task : new FormControl('' , Validators.required )
    });

    userform=new FormGroup ({
      fullname: new FormControl('', [Validators.minLength(6),
      Validators.required]),
      email: new FormControl('', Validators.required),
      // major: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.minLength(6),
      Validators.required])

    });

    loginform=new FormGroup ({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });


    


 
  
   createTask(data:any) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("posts")
          .add(data).then(res => {
            this.form.reset();
            this.router.navigate(['']);
            alert("Added successfully");
          }, err => reject(err));

  });  
}



getTask() { 
  return this.firestore.collection("posts").snapshotChanges();
}

onEditdata(data: any){
  this.form.controls['title'].setValue(data.payload.doc.data().title);
  this.form.controls['task'].setValue(data.payload.doc.data().task);
  
}

UpdateTask( data: any){
  
  return this.firestore.collection("posts").doc(data.payload.doc.id);
}

deleteTask(data: any) {
  return this.firestore.collection("posts").doc(data.payload.doc.id).delete();
}




logIn(userdata:any) : Observable<user>{

// new code from here
  // var User:user;
  let userref=this.firestore.collection<user>('user' , ref=> ref.where('email' , '==' , userdata.email ).where('password' , '==' , userdata.password));
  const user$ = userref.valueChanges().pipe(
    map(users => {
      const user = users[0];
      // console.log(user);
      this.userdata=user;
      localStorage.setItem('user',JSON.stringify(this.userdata));
      // JSON.parse(localStorage.getItem('user')!);
      console.log(this.userdata);
      
      return user;
    })
  );
 
  // console.log(user$);
 return user$;

}

createUser(data:any) {
  return new Promise<any>((resolve, reject) =>{
    this.firestore
        .collection("user")
        .add(data).then(res => {
          this.form.reset();
          this.router.navigate(['']);
          alert("registration successful");
        }, err => reject(err));

});  
}

get isLogIn():boolean{

  const useronline= JSON.parse(localStorage.getItem('user')!);
  this.userdata=useronline;
  
  // this.downloadURL=this.af.ref('/files/' + this.userdata.profile_img).getDownloadURL();
  return (useronline !== null) ? true +this.userdata : false;
  
}


createDate(){
  const date = new Date();
  this.fulDate=date.getDate().toString()+"/"+ (date.getMonth()+1).toString()+"/" + date.getFullYear().toString();
  return this.fulDate;

}
}












