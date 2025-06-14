# Back‑in‑Stock Notifier

A Node.js backend service that allows users to subscribe to out‑of‑stock products and automatically sends them an email (via Gmail SMTP) as soon as the product is restocked. Background jobs are managed with BullMQ + Redis, and data is stored in PostgreSQL via Sequelize ORM.

## Features

1. **Product Management**

   - Create products (`name`, `stock`)
   - List & paginate products
   - Update stock

2. **Subscription Management**

   - Subscribe a user’s email to a product
   - List all subscriptions

3. **Automated Notifications**
   - Every 5 minutes (repeatable BullMQ job)
   - Find all products with `stock > 0` and subscriptions where `isNotified = false`
   - Send Gmail email
   - Mark `isNotified = true`, set `notifiedAt` timestamp

## Setup & Running

1.  **Clone & install**
    git clone <your-repo-url>
    cd back-in-stock-notifier
    npm install
2.  **Set UP the .env file**

3.  **run Redis service or redis-server.exe**
4.  **API server (auto‑reload in dev)**
    npm run dev
5.  **Worker & queue**
    npm run worker
6.  **Trigger a manual job (optional)**
      npm run queue
    — or wait 5 minutes for the repeatable job to fire.

"# back-in-stock-notifier" 
