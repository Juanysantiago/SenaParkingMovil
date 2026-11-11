const app = require('./app');
const sequelize = require('./config/database');

sequelize
  .authenticate()
  .then(async () => {
    console.log('✅ DB conectada');
    // No usar alter: true para evitar índices duplicados
    await sequelize.sync();
    console.log('✅ Tablas sincronizadas');
  })
  .catch((err) => {
    console.error('❌ Error de base de datos:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});