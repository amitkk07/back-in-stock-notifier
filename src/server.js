const app = require('./app');
const { sequelize } = require('./models'); // loads DB and relationships
require('dotenv').config();

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully!');

    await sequelize.sync({ alter: true }); // don't use { force: true } in prod
    console.log('📦 DB models synced successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ DB connection or sync failed:', err);
    process.exit(1);
  }
})();
