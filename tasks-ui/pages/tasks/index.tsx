import Head from 'next/head';
import React from 'react';

import { TasksPage } from 'modules/TasksPage/TasksPage';

const Tasks = () => (
  <>
    <Head>
      <title>Tasks</title>
    </Head>
    <TasksPage />
  </>
);

export default Tasks;
