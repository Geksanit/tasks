import { Button, Card, CardActions, CardContent, FormControl, TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useStores, useAfterCommunication } from 'hooks';

import css from './Tasks.module.scss';

type Prop = {
  id: number;
};

export const EditTask = observer(({ id }: Prop) => {
  const {
    taskStore: { tasks, editTask, editTaskState },
  } = useStores();
  const { handleSubmit, register, errors } = useForm();
  const router = useRouter();
  useAfterCommunication(editTaskState, () => router.push('/tasks/'));
  const task = tasks[id];
  const onSubmit = async (data: { title: string }) => {
    editTask({ name: data.title, status: 'к выполнению', id: 0 });
  };

  return (
    <Card className={css.card}>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <TextField
              type="text"
              name="title"
              label="имя задачи"
              error={!!errors.title}
              helperText={errors.title && String(errors.title.message)}
              inputRef={register({ required: 'Поле обязательно для заполнения' })}
              defaultValue={task.name}
            />
          </FormControl>

          <CardActions>
            <Button variant="contained" color="primary" type="submit" size="small">
              Сохранить
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
});
