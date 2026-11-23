require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/database");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* MODELOS */
require("./models");

/* CORS */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    ],
    credentials: true,
  })
);

/* COOKIES */
app.use(cookieParser());

/* BODY PARSER */
const MAX_BODY_SIZE = "2mb";

app.use(
  express.json({
    limit: MAX_BODY_SIZE,
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: MAX_BODY_SIZE,
    parameterLimit: 1000,
  })
);

/* ARCHIVOS ESTÁTICOS */
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "../uploads"))
);

/* RUTA PRINCIPAL */
app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "SENAPARKING API funcionando correctamente",
    estado: "Activo",
    documentacion: "/api-docs"
  });
});

/* RUTAS */
app.use("/auth", require("./routers/authRouter"));

app.use("/api", require("./routers/tipoDocumentoRouter"));
app.use("/api", require("./routers/entradaSalidaAprendizRouter"));
app.use("/api", require("./routers/centroFormacionRouter"));
app.use("/api", require("./routers/notificacionRouter"));
app.use("/api", require("./routers/soporteRouter"));

app.use(
  "/api/carnet",
  require("./routers/carnetRouter")
);

app.use(
  "/api/vehiculos",
  require("./routers/vehiculoRouter")
);

app.use(
  "/api",
  require("./routers/aprendiz/solicitudCarnetRouter")
);

app.use(
  "/api",
  require("./routers/aprendiz/solicitudActualizacionRouter")
);

app.use(
  "/api",
  require("./routers/aprendiz/reportesRouter")
);

app.use(
  "/api",
  require("./routers/reportesRouter")
);

/* INICIAR SERVIDOR */
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log("Conexión a MySQL establecida correctamente.");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`Documentación Swagger: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar con MySQL:", error);
    process.exit(1);
  });

module.exports = app;
