import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...currentTasks, task]);
    this.saveTasks();
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.tasksSubject.getValue();
    const indexOfUpdated = tasks.findIndex(t => t.id === updatedTask.id);
    tasks[indexOfUpdated] = updatedTask;
    this.tasksSubject.next([...tasks]);
    this.saveTasks();
  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasksSubject.getValue()));
  }

  loadTasks(): void {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasksSubject.next(JSON.parse(tasks));
    }
  }
}
