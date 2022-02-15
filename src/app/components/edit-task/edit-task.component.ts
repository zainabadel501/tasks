import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { NewTaskComponent } from 'src/app/components/new-task/new-task.component';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
   
  taskData !:any;

  
  constructor( private Api : ApiService , private router: Router , private newtaskdat : DataService ) { }

  ngOnInit(): void {
  this.getAlltask();
  }

  getAlltask(){
    // this.Api.getTask().subscribe(res=>{
    //   this.taskData=res;
    // })
    this.newtaskdat.getTask().subscribe(res=>{
        this.taskData=res;
      });
  }

  deleteTask(row: any){
    // this.Api.deleteTask(row.id).subscribe(res=>{
    //   alert("task deleted");
    //   this.getAlltask();
    // });

    this.newtaskdat.deleteTask(row);

  }

  onEdit(row : any){
    //check tomorr
    // this.newtaskdat.form.controls['title'].setValue(row.title);
    // this.newtaskdat.form.controls['task'].setValue(row.task);
    this.newtaskdat.UpdateTask(row);
  }

  



}
