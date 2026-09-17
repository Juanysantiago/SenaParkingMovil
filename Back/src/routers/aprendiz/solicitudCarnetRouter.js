
const express = require("express");

const router = express.Router();

const verifyToken = require("../../middlewares/verifyToken");

const upload = require("../../middlewares/upload");

const {
  crearSolicitud,
  listarSolicitudes,
  aprobarSolicitud,
  rechazarSolicitud,
} = require("../../controllers/aprendiz/solicitudCarnetController");

// ============================================================
// CREAR SOLICITUD DE CARNET
// ============================================================

router.post(
  "/solicitudes-carnet",
  verifyToken,

  upload.fields([
    // Foto del aprendiz
    {
      name: "fotoAprendiz",
      maxCount: 1,
    },

    // Foto completa del vehículo
    {
      name: "fotoVehiculo",
      maxCount: 1,
    },

    // NUEVO:
    // Foto de la placa de la moto
    // o foto del serial de la bicicleta
    {
      name: "fotoPlacaSerial",
      maxCount: 1,
    },

    // Documentos adicionales
    {
      name: "documentosAnexos",
      maxCount: 10,
    },
  ]),

  crearSolicitud
);

// ============================================================
// LISTAR SOLICITUDES
// ============================================================

router.get(
  "/solicitudes-carnet",
  verifyToken,
  listarSolicitudes
);

// ============================================================
// APROBAR SOLICITUD
// ============================================================

router.put(
  "/solicitudes-carnet/:id/aprobar",
  verifyToken,
  aprobarSolicitud
);

// ============================================================
// RECHAZAR SOLICITUD
// ============================================================

router.put(
  "/solicitudes-carnet/:id/rechazar",
  verifyToken,
  rechazarSolicitud
);

module.exports = router;

