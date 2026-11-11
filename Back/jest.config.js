
module.exports = {
  // El backend utiliza Node.js
  testEnvironment: 'node',

  // Buscar pruebas dentro de la carpeta tests
  testMatch: ['**/tests/**/*.test.js'],

  // Mostrar detalles de las pruebas en consola
  verbose: true,

  // Cerrar Jest después de ejecutar las pruebas
  forceExit: true,

  // Limpiar los mocks entre pruebas
  clearMocks: true,

  // Ejecutar las pruebas de forma secuencial
  maxWorkers: 1,

  // Configuración de reportes
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports/backend',
        filename: 'reporte-backend.html',
        expand: true,
        pageTitle: 'Reporte de Pruebas - SENA PARKING Backend',
        hideIcon: false,
      },
    ],
  ],
};
