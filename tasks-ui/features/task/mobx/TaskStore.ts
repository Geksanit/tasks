import { flow, makeObservable, observable } from 'mobx';

import { makeInitialCommunicationField } from 'shared/helpers/makeInitialCommunicationField';

import { CreateTask, Task } from '../../../../types/generated';

const taskMock: CreateTask[] = [
  {
    name: 'купить молоко',
    status: 'к выполнению',
  },
  {
    name: 'купить хлеб',
    status: 'в процессе',
  },
  {
    name: 'сварить пельмени',
    status: 'выполнено',
  },
  {
    name: 'помыть посуду',
    status: 'к выполнению',
  },
];

class TaskStore {
  public tasks: CreateTask[] = taskMock;

  public taskLoadState = makeInitialCommunicationField();

  public createTaskState = makeInitialCommunicationField();

  public editTaskState = makeInitialCommunicationField();

  public setStatusState = makeInitialCommunicationField();

  public deleteTaskState = makeInitialCommunicationField();

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
      yield;
      this.taskLoadState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.taskLoadState = { isRequesting: false, error: message as string };
    }
  }

  *createTask(data: CreateTask) {
    this.createTaskState = { isRequesting: true, error: null };
    try {
      this.tasks.push(data);
      yield;
      this.createTaskState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.createTaskState = { isRequesting: false, error: message as string };
    }
  }

  *editTask(data: Task) {
    this.editTaskState = { isRequesting: true, error: null };
    try {
      const index = this.tasks.findIndex((t, i) => i === data.id);
      if (index === -1) {
        throw new Error('not found task');
      }
      this.tasks.splice(index, 1, data);
      yield;
      this.editTaskState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.editTaskState = { isRequesting: false, error: message as string };
    }
  }

  *setStatus(data: Pick<Task, 'id' | 'status'>) {
    this.editTaskState = { isRequesting: true, error: null };
    try {
      const index = this.tasks.findIndex((t, i) => i === data.id);
      if (index === -1) {
        throw new Error('not found task');
      }
      this.tasks[index].status = data.status;
      yield;
      this.editTaskState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.editTaskState = { isRequesting: false, error: message as string };
    }
  }

  *deleteTask(id: number) {
    this.deleteTaskState = { isRequesting: true, error: null };
    try {
      const index = this.tasks.findIndex((t, i) => i === id);
      if (index === -1) {
        throw new Error('not found task');
      }
      this.tasks.splice(index, 1);
      yield;
      this.deleteTaskState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.deleteTaskState = { isRequesting: false, error: message as string };
    }
  }
}

export { TaskStore };
