import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  taskData :any = this.newtaskdat.taskData;

  constructor(private newtaskdat : DataService) { }

  ngOnInit(): void {
    this.getAlltask();
  }

  getAlltask(){

    this.newtaskdat.getTask().subscribe(res=>{
        this.taskData=res;
      });
  }

}
