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
   
  taskData :any = this.newtaskdat.taskData;

  
  constructor( private Api : ApiService , private router: Router , public newtaskdat : DataService ) { }

  ngOnInit(): void {
  this.getAlltask();
  }

  getAlltask(){

    this.newtaskdat.getTask().subscribe(res=>{
        this.taskData=res;
      });
  }

  deleteTask(row: any){
    this.newtaskdat.deleteTask(row);
    console.log(row);
  }

  onEdit(row : any){
    this.newtaskdat.update=true;
    this.newtaskdat.onEditdata(row);
    this.newtaskdat.taskData=row;
    
  }

  



}
