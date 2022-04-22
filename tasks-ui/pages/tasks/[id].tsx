import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { EditTaskPage } from 'modules/EditTask/EditTask';

const Offer: React.FC = () => {
  const router = useRouter();
  const stringId = router.query.id;
  const id = typeof stringId === 'string' ? parseInt(stringId, 10) : null;
  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      {id !== null ? <EditTaskPage id={id} /> : <p>Произошла ошибка</p>}
    </>
  );
};

export default Offer;
