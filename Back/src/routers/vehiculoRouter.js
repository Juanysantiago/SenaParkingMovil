const express = require("express");

const {
  createVehiculo,
  getVehiculos,
  getVehiculoById,
  updateVehiculo,
  deleteVehiculo,
  getMisVehiculos,
} = require("../controllers/vehiculoController");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// =====================================================
// VEHÍCULOS
// =====================================================

// Obtener todos los vehículos
// SOLO ADMINISTRADOR
router.get(
  "/",
  verifyToken,
  getVehiculos
);

// Crear vehículo
// El propietario será automáticamente req.user.id
router.post(
  "/",
  verifyToken,
  createVehiculo
);

// =====================================================
// MIS VEHÍCULOS
// IMPORTANTE: DEBE ESTAR ANTES DE /:id
// =====================================================
router.get(
  "/mis-vehiculos",
  verifyToken,
  getMisVehiculos
);

// =====================================================
// VEHÍCULO POR ID
// El controlador verifica propiedad
// =====================================================
router.get(
  "/:id",
  verifyToken,
  getVehiculoById
);

// =====================================================
// ACTUALIZAR
// El controlador verifica propiedad
// =====================================================
router.put(
  "/:id",
  verifyToken,
  updateVehiculo
);

// =====================================================
// ELIMINAR
// El controlador verifica propiedad
// =====================================================
router.delete(
  "/:id",
  verifyToken,
  deleteVehiculo
);

module.exports = router;