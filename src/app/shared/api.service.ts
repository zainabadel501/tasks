import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators' ;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }
  postTask(data : any ) {
    return this.http.post<any>('https://my-task-project-3c8eb-default-rtdb.firebaseio.com/posts.json' , data).pipe(map((res:any)=>{ return res;}));
  }
  getTask(){
    return this.http.get<any>('https://my-task-project-3c8eb-default-rtdb.firebaseio.com/posts.json').pipe(map((res:any)=>{ return res;}));
  }

  updateTask(data:any , id: number){
    return this.http.put<any>('https://my-task-project-3c8eb-default-rtdb.firebaseio.com/posts/'+id , data).pipe(map((res:any)=>{ return res;}));
  }

  deleteTask(id: number){
    return this.http.delete<any>('https://my-task-project-3c8eb-default-rtdb.firebaseio.com/posts/'+id).pipe(map((res:any)=>{ return res;}));
  }
  
}


