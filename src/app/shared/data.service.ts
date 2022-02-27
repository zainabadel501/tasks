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
  



  constructor( private firestore: AngularFirestore , private http : HttpClient , private router: Router , private af: AngularFireStorage) {}
    form = new FormGroup({        
        title : new FormControl('', Validators.required),
        task : new FormControl('' , Validators.required )
    });

    userform=new FormGroup ({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      // major: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)

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


uploadimg(path:any){
  console.log(path);
  this.af.upload("/files"+Math.random()+path,path);

}

logIn(userdata:any) : Observable<user>{

// new code from here
  // var User:user;
  let userref=this.firestore.collection<user>('user' , ref=> ref.where('email' , '==' , userdata.email ).where('password' , '==' , userdata.password));
  const user$ = userref.valueChanges().pipe(
    map(users => {
      const user = users[0];
      console.log(user);
      return user;
    })
  );
 
  console.log(user$);
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

}






