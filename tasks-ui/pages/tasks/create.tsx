import Head from 'next/head';
import React from 'react';

import { CreateTaskPage } from 'modules/CreateTask/CreateTask';

const News = () => (
  <>
    <Head>
      <title>Tasks</title>
    </Head>
    <CreateTaskPage />
  </>
);

export default News;
