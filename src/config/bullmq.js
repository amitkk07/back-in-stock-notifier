

const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');
require('dotenv').config();

const connection = new IORedis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,             // ✅ REQUIRED for BullMQ to work
  enableReadyCheck: false                 // ✅ Optional but recommended
});

const notifierQueue = new Queue('notifier-queue', { connection });

module.exports = {
  connection,
  notifierQueue,
  Worker
};
