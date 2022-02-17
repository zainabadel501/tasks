

import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { newTaskModel } from '../../shared/new-task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  tasks = {
    title : "",
    task :""
  };

  Uptasks = {
    title : "",
    task :""
  };


  public newtaskform !: FormGroup ;
  constructor(  public newtaskdat : DataService , private router: Router) { }

  ngOnInit(): void {
    this.newtaskform =this.newtaskdat.form;
  }

        update:boolean= this.newtaskdat.update;
        taskData :any = this.newtaskdat.taskData;


  //fix the buttons
  cancel() {
    this.router.navigate(['']);
    }



  
  post() {

    this.tasks.title=this.newtaskdat.form.value.title;
    this.tasks.task=this.newtaskdat.form.value.task;
    console.log(this.tasks);
    this.newtaskdat.createTask(this.tasks);
    
  }

  updat(){

    console.log(this.taskData);

    this.Uptasks.title=this.newtaskdat.form.value.title;
    this.Uptasks.task=this.newtaskdat.form.value.task;


    this.newtaskdat.UpdateTask(this.taskData).update(this.Uptasks).then(res=>{
      this.newtaskdat.form.reset();
      this.router.navigate(['']);
      this.newtaskdat.update=false;
      alert("update successfully");
    }, er=>{
      alert("something went wrong");
    });
     
  }





}





