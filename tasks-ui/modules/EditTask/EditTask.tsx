import { Box, Typography } from '@material-ui/core';
import React from 'react';

import { EditTask } from 'features/task';
import { Header } from 'shared/view/components';

import styles from './EditTask.module.scss';

type Prop = {
  id: number;
};

const EditTaskPage = ({ id }: Prop) => (
  <>
    <Header />
    <main className={styles.tasksPage}>
      <Box>
        <Typography variant="h5" color="primary" gutterBottom align="center">
          Редактирование задачи
        </Typography>
      </Box>
      <Box className={styles.box}>
        <EditTask id={id} />
      </Box>
    </main>
  </>
);

export { EditTaskPage };
