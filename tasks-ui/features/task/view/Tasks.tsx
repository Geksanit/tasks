import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useStores } from 'hooks';

import css from './Tasks.module.scss';

export const Tasks = observer(() => {
  const {
    taskStore: { tasks, getTasks, deleteTask, setStatus },
  } = useStores();
  const router = useRouter();
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const onBegin = (id: number) => {
    setStatus({ id, status: 'в процессе' });
  };
  const onEnd = (id: number) => {
    setStatus({ id, status: 'выполнено' });
  };
  const onEdit = (id: number) => {
    router.push(`/tasks/${id}`);
  };

  return (
    <>
      <div className={css.root} style={{ marginTop: '30px' }}>
        {tasks.map((t) => (
          <Card className={css.card} key={t.id}>
            <CardContent>
              <Typography component="div">Статус: {t.status}</Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                {t.name}
              </Typography>
            </CardContent>
            <CardActions>
              {t.status === 'к выполнению' && (
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => onBegin(t.id)}
                >
                  начать
                </Button>
              )}
              {t.status === 'в процессе' && (
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => onEnd(t.id)}
                >
                  закончить
                </Button>
              )}
              <Button size="small" color="primary" variant="contained" onClick={() => onEdit(t.id)}>
                переименовать
              </Button>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => deleteTask(t.id)}
              >
                удалить
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
});
