import express from 'express';

import { HttpError } from '../../utils/Errors';
import { createLogger } from '../../middlewares/logger';
import { CreateTask } from '../../types/generated';

let tasks: CreateTask[] = [
  {
    name: 'купить молоко',
    status: 'к выполнению',
  },
  {
    name: 'купить хлеб',
    status: 'в процессе',
  },
  {
    name: 'сварить пельмени',
    status: 'выполнено',
  },
  {
    name: 'помыть посуду',
    status: 'к выполнению',
  },
];

export const makeRouter = () => {
  const router = express.Router();
  router.use(createLogger(module));

  router.get('/', async (req, res, next) => {
    try {
      res.json(tasks.map((t, i) => ({ ...t, id: i })));
    } catch (error) {
      next(error);
    }
  });
  router.post('/', async (req, res, next) => {
    try {
      tasks.push(req.body);
      res.status(201).send('created');
    } catch (error) {
      next(error);
    }
  });
  router.patch('/', async (req, res, next) => {
    try {
      const {
        body: { id },
      } = req;
      const index = tasks.findIndex((t, i) => i === id);
      if (index === -1) {
        throw new HttpError(400, 'not found task');
      }
      tasks.splice(index, 1, req.body);
      res.send('updated');
    } catch (error) {
      next(error);
    }
  });
  router.delete('/', async (req, res, next) => {
    try {
      const {
        body: { id },
      } = req;
      const index = tasks.findIndex((t, i) => i === id);
      if (index === -1) {
        throw new HttpError(400, 'not found task');
      }
      tasks.splice(index, 1);
      res.send('deleted');
    } catch (error) {
      next(error);
    }
  });
  router.post('/setStatus/', async (req, res, next) => {
    try {
      const {
        body: { id, status },
      } = req;
      tasks = tasks.map((t, i) => (i === id ? { ...t, status } : t));
      res.status(201).send('successful');
    } catch (error) {
      next(error);
    }
  });

  return router;
};
