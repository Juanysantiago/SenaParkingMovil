
const { defineConfig } = require('cypress');
const { merge } = require('mochawesome-merge');
const marge = require('mochawesome-report-generator');
const fs = require('fs');

const reportDir = 'cypress/reports/json';

module.exports = defineConfig({
  // Configuración del reporte HTML
  reporter: 'mochawesome',

  reporterOptions: {
    reportDir,
    overwrite: true,
    html: false,
    json: true,
  },

  e2e: {
    // Dirección de Expo Web
    baseUrl: 'http://localhost:8081',

    defaultCommandTimeout: 10000,

    retries: {
      runMode: 1,
      openMode: 0,
    },

    video: false,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {

      // Limpiar reportes JSON anteriores
      on('before:run', () => {
        fs.rmSync(reportDir, {
          recursive: true,
          force: true,
        });

        fs.mkdirSync(reportDir, {
          recursive: true,
        });
      });

      // Generar el reporte HTML al finalizar
      on('after:run', async () => {
        const jsonReport = await merge({
          files: [`${reportDir}/*.json`],
        });

        await marge.create(jsonReport, {
          reportDir: 'cypress/reports/html',
          reportFilename: 'reporte-cypress',
          reportTitle: 'Reporte de Pruebas E2E - SENA PARKING Móvil',
          inline: true,
        });

        console.log('Reporte HTML de Cypress generado correctamente.');
      });

      return config;
    },
  },
});
