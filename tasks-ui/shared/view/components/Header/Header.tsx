import { AppBar, Button, Container, Toolbar, Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import React from 'react';

import styles from './Header.module.scss';

const Header = observer(() => (
  <AppBar position="static">
    <Container maxWidth="lg">
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          Управление задачами
        </Typography>
        <Link href="/tasks/" passHref>
          <Button color="inherit" size="large">
            Список
          </Button>
        </Link>
        <Link href="/tasks/create" passHref>
          <Button color="inherit" size="large">
            Создать
          </Button>
        </Link>
      </Toolbar>
    </Container>
  </AppBar>
));

export { Header };
