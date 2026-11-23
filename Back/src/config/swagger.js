
// backend/nodejs_express/config/swagger.js

const swaggerJsdoc = require("swagger-jsdoc");

const isProduction = process.env.NODE_ENV === "production";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "SENAPARKING API",
      version: "1.0.0",
      description: "Documentación de la API del sistema SENAPARKING",
    },

    servers: [
      {
        url: isProduction
  ? "https://api-project-senaparking-crhgfvaaaxhgesbp.spaincentral-01.azurewebsites.net"
  : `http://localhost:${process.env.PORT || 3000}`,

        description: isProduction
          ? "Servidor en Azure"
          : "Servidor local",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/routers/**/*.js"],
});

module.exports = swaggerSpec;
