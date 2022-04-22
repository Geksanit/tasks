import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useStores, useAfterCommunication } from 'hooks';

import css from './Tasks.module.scss';

export const CreateTask = observer(() => {
  const {
    taskStore: { createTask, createTaskState },
  } = useStores();
  const { handleSubmit, register, errors } = useForm();
  const router = useRouter();
  useAfterCommunication(createTaskState, () => router.push('/tasks/'));
  const onSubmit = async (data: { title: string }) => {
    createTask({ name: data.title, status: 'к выполнению' });
  };

  return (
    <Card className={css.card}>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography component="div" color="primary">
            Новая задача
          </Typography>

          <FormControl fullWidth margin="normal">
            <TextField
              type="text"
              name="title"
              label="имя задачи"
              error={!!errors.title}
              helperText={errors.title && String(errors.title.message)}
              inputRef={register({ required: 'Поле обязательно для заполнения' })}
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
