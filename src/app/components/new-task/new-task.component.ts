

import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { ApiService } from 'src/app/shared/api.service';
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
  public newtaskform !: FormGroup ;
  taskOpject : newTaskModel = new newTaskModel(); 
  constructor( private formbuilder: FormBuilder , private Api: ApiService , private newtaskdat : DataService , private router: Router) { }

  ngOnInit(): void {
    this.newtaskform =this.newtaskdat.form;
  }


  //fix the buttons
  cancel() {
    this.router.navigate(['']);
    }

  
  post() {

    this.tasks.title=this.newtaskdat.form.value.title;
    this.tasks.task=this.newtaskdat.form.value.task;
    // this.ordersService.form.value.coffeeOrder = this.coffeeOrder;
    // let data = this.ordersService.form.value;
    this.newtaskdat.createTask(this.tasks);
  }

  onEdit(row: any){
    this.newtaskform.controls['title'].setValue(row.title);
    this.newtaskform.controls['task'].setValue(row.task);

  }

}





