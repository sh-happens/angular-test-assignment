import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.loadTasks();
  }

  getTasks() {
    return this.tasksSubject.asObservable();
  }

  saveTask(task: Task) {
    const tasks = this.tasksSubject.getValue();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      tasks[index] = task;
    } else {
      tasks.push(task);
    }
    this.tasksSubject.next(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasksSubject.next(tasks);
  }
}
