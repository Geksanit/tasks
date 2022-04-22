import { Box, Typography } from '@material-ui/core';
import React from 'react';

import { CreateTask } from 'features/task';
import { Header } from 'shared/view/components';

import styles from './CreateTask.module.scss';

const CreateTaskPage = () => (
  <>
    <Header />
    <main className={styles.tasksPage}>
      <Box>
        <Typography variant="h5" color="primary" gutterBottom align="center">
          Новая задача
        </Typography>
      </Box>
      <Box className={styles.box}>
        <CreateTask />
      </Box>
    </main>
  </>
);

export { CreateTaskPage };
