
module.exports = {
  // Preset oficial de Expo para React Native
  preset: 'jest-expo',

  // Ubicación de las pruebas
  testMatch: [
    '**/src/tests/**/*.test.{js,jsx,ts,tsx}',
  ],

  // Configuración general
  clearMocks: true,
  verbose: true,
  maxWorkers: 1,

  // Reportes
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports/frontend',
        filename: 'reporte-frontend.html',
        expand: true,
        pageTitle: 'Reporte de Pruebas - SENA PARKING Móvil',
        hideIcon: false,
      },
    ],
  ],
};
