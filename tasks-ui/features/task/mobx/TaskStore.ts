import { flow, makeObservable, observable } from 'mobx';

import { makeInitialCommunicationField } from 'shared/helpers/makeInitialCommunicationField';

import { CreateTask, Task } from '../../../../types/generated';
import { TaskApi } from './api/Task';

class TaskStore {
  public tasks: Task[] = [];

  public taskLoadState = makeInitialCommunicationField();

  public createTaskState = makeInitialCommunicationField();

  public editTaskState = makeInitialCommunicationField();

  public setStatusState = makeInitialCommunicationField();

  public deleteTaskState = makeInitialCommunicationField();

  private api = new TaskApi();

  constructor() {
    makeObservable(this, {
      tasks: observable,
      taskLoadState: observable,
      createTaskState: observable,
      editTaskState: observable,
      setStatusState: observable,
      deleteTaskState: observable,

      getTasks: flow,
      createTask: flow,
      editTask: flow,
      setStatus: flow,
      deleteTask: flow,
    });

    this.getTasks = this.getTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  *getTasks() {
    this.taskLoadState = { isRequesting: true, error: null };
    try {
      this.tasks = yield this.api.loadTasks();
      this.taskLoadState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.taskLoadState = { isRequesting: false, error: message as string };
    }
  }

  *createTask(data: CreateTask) {
    this.createTaskState = { isRequesting: true, error: null };
    try {
      yield this.api.createTask(data);
      this.createTaskState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.createTaskState = { isRequesting: false, error: message as string };
    }
  }

  *editTask(data: Task) {
    this.editTaskState = { isRequesting: true, error: null };
    try {
      console.log('*editTask start');
      yield this.api.editTask(data);
      console.log('*editTask stop');
      this.editTaskState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.editTaskState = { isRequesting: false, error: message as string };
    }
  }

  *setStatus(data: Pick<Task, 'id' | 'status'>) {
    this.setStatusState = { isRequesting: true, error: null };
    try {
      yield this.api.setStatus(data);
      yield this.getTasks();
      this.setStatusState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.setStatusState = { isRequesting: false, error: message as string };
    }
  }

  *deleteTask(id: number) {
    this.deleteTaskState = { isRequesting: true, error: null };
    try {
      yield this.api.deleteTask(id);
      yield this.getTasks();
      this.deleteTaskState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.deleteTaskState = { isRequesting: false, error: message as string };
    }
  }
}

export { TaskStore };
