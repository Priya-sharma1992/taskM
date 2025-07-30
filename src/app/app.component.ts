import { Component ,inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './service/master.service';
import { ApiResponseModel, ITask, Task } from './model/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
taskObj : Task = new Task(); 
  ngOnInit(): void {
   this.loadAllTask();
  }
  taskList: ITask[] = [];
  title = 'taskM';
  masterService = inject(MasterService);
  // constructor( private master:MasterService){
       //old way
  // }
  loadAllTask(){
    this.masterService.getAllTaskList().subscribe((res:ApiResponseModel)=>{
this.taskList = res.data;
    })
  }
addTask(){
  this.masterService.addNewtask(this.taskObj).subscribe((res:ApiResponseModel)=>{
if(res.result){
  alert('task created succesfully');
  this.loadAllTask();
  this.taskObj = new Task();
}
  },error=>{
    alert('API call error');
  })
}
 onEdit(item:Task){
this.taskObj = item;
 }
}
