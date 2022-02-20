import { Injectable } from '@angular/core';
import { Post } from 'src/app/model/posts'; 
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FormControl, FormGroup , Validators  } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  update: boolean= false;
  taskData :any;

  constructor( private firestore: AngularFirestore , private http : HttpClient , private router: Router) {}
    form = new FormGroup({        
        title : new FormControl('', Validators.required),
        task : new FormControl('' , Validators.required )
    }) 

    


 
  
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

}






