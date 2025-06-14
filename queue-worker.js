const { notifierQueue, Worker, connection } = require('./src/config/bullmq');
const runNotifierJob = require('./src/jobs/notifierJob');
require('dotenv').config();
require('./src/models'); // Ensure models are loaded

// Create repeatable job (every 5 minutes)
(async () => {
  await notifierQueue.add(
    'check-stock',
    {},
    {
      repeat: { every: 5 * 60 * 1000 }, // every 5 minutes
      removeOnComplete: true,
    }
  );
})();

// Worker
const worker = new Worker(
  'notifier-queue',
  async () => {
    console.log('🕒 Running notifier job...');
    await runNotifierJob();
  },
  { connection }
);

console.log('🚀 Queue & Worker started.');
