import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';

import { Tasks } from 'features/task/view/Tasks';
import { Header } from 'shared/view/components';

import styles from './TasksPage.module.scss';

const TasksPage = () => (
  <>
    <Header />
    <main className={styles.tasksPage}>
      <Box>
        <Typography variant="h5" color="primary" gutterBottom align="center">
          Список задач
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Tasks />
      </Container>
    </main>
  </>
);

export { TasksPage };
