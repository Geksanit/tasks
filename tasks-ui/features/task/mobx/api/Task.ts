import { HttpActions, httpActions } from 'services/httpActions';
import { isFailureResponse, getErrorMessage } from 'shared/helpers';
import { ResponseWithData, Response } from 'shared/types';

import { CreateTask, SetStatus, Task } from '../../../../../types/generated';

class TaskApi {
  private actions: HttpActions;

  constructor() {
    this.actions = httpActions;
  }

  public async loadTasks() {
    const response = await this.actions.get<ResponseWithData<Array<Task>>>(
      `${process.env.host}/tasks/`,
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async createTask(data: CreateTask) {
    const response = await this.actions.post<Response>(`${process.env.host}/tasks/`, data);

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return null;
  }

  public async editTask(data: Task) {
    console.log('editTask start');
    const response = await this.actions.patch<Response>(`${process.env.host}/tasks/`, data);
    console.log('editTask stop', response);
    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return null;
  }

  public async deleteTask(id: number) {
    const response = await this.actions.delete<Response>(`${process.env.host}/tasks/${id}`);

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return null;
  }

  public async setStatus(data: SetStatus) {
    const response = await this.actions.post<Response>(
      `${process.env.host}/tasks/setStatus/`,
      data,
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return null;
  }
}

export { TaskApi };
