export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: TaskPriority;
  status: TaskStatus;
  assignees: string[];
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export enum TaskStatus {
  Todo = 'To do',
  InProgress = 'In Progress',
  Done = 'Done'
}
