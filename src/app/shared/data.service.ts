import { Injectable } from '@angular/core';
import { Post } from 'src/app/model/posts'; 
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor( private firestore: AngularFirestore , private http : HttpClient , private router: Router) {}
    form = new FormGroup({        
        title : new FormControl(''),
        task : new FormControl('')
    })


  // constructor(private db: AngularFirestore) { }
  // // need to understand 
  // createPost(post: Post) {
  //   const postData = JSON.parse(JSON.stringify(post));
  //   return this.db.collection('posts').add(postData);
  //   }
  
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


UpdateTask( data: any){
  return this.firestore.collection("posts").doc(data.payload.doc.id).set({ completed: true }, { merge: true });
}

deleteTask(data: any) {
  return this.firestore.collection("posts").doc(data.payload.doc.id).delete();
}

}






