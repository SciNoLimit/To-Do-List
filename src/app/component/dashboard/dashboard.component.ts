import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskobj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.taskobj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask(){
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
        alert("Error : Unable to get the list of tasks");
    })
  }

  addTask() {
    this.taskobj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskobj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err);
    })
  }

  editTask() {
    this.taskobj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskobj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Error : Failed to update task");
    })
  }

  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => {
        alert("Error : Failed to delete task");
    })
  }

  call(etask : Task){
    this.taskobj = etask;
    this.editTaskValue = etask.task_name;
  }

}
