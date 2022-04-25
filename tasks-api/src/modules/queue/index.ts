import express from 'express';
import amqp from 'amqplib';

import { createLogger } from '../../middlewares/logger';

const queueName = 'hello2';
const exchangeName = 'testExchange2';

export const makeRouter = async () => {
  const router = express.Router();
  router.use(createLogger(module));
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  channel.assertExchange(exchangeName, 'fanout', {
    durable: true,
  });

  const queue1 = await channel.assertQueue(queueName, {
    durable: true,
  });

  channel.bindQueue(queue1.queue, exchangeName, '');

  const receiveData = (q: string) => {
    console.log('Wait data from queue');
    channel.consume(
      q,
      msg => {
        if (msg?.content) {
          console.log('Received %s', msg.content.toString());
          setTimeout(() => {
            console.log('Done', msg.content.toString());
            channel.ack(msg);
          }, 10 * 1000);
        }
      },
      { noAck: false },
    );
  };
  receiveData(queue1.queue);

  router.post('/', async (req, res, next) => {
    try {
      const msg = JSON.stringify(req.body);
      channel.publish(exchangeName, '', Buffer.from(msg), { persistent: true });
      console.log('Published %s', msg);
      res.status(200).send({ res: 'successfull' });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
