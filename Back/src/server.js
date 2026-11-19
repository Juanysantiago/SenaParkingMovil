
// backend/nodejs_express/server.js

const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ DB conectada');

    // Sincronizar las tablas
    await sequelize.sync();
    console.log('✅ Tablas sincronizadas');

    // Iniciar servidor para Azure y desarrollo local
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Error al iniciar el servidor:', err);
    process.exit(1);
  }
}

startServer();
