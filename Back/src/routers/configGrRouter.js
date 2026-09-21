const express = require("express");

const router = express.Router();

const {
  getConfigGr,
  createConfigGr,
  updateConfigGr,
  deleteConfigGr
} = require("../controllers/configGrController");

/**
 * @swagger
 * tags:
 *   name: Configuración GR
 *   description: Gestión de las configuraciones GR del sistema
 */

/**
 * @swagger
 * /api/config-gr:
 *   get:
 *     summary: Listar configuraciones GR
 *     tags: [Configuración GR]
 *     description: Obtiene todas las configuraciones GR registradas en el sistema.
 *     responses:
 *       200:
 *         description: Configuraciones obtenidas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error obteniendo configuraciones.
 */
router.get(
  "/config-gr",
  getConfigGr
);

/**
 * @swagger
 * /api/config-gr:
 *   post:
 *     summary: Crear configuración GR
 *     tags: [Configuración GR]
 *     description: Crea una nueva configuración GR utilizando los datos enviados en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             description: Datos de la configuración GR definidos por el modelo ConfigGr.
 *     responses:
 *       201:
 *         description: Configuración creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Creado correctamente"
 *                 data:
 *                   type: object
 *       500:
 *         description: Error creando configuración.
 */
router.post(
  "/config-gr",
  createConfigGr
);

/**
 * @swagger
 * /api/config-gr/{id}:
 *   put:
 *     summary: Actualizar configuración GR
 *     tags: [Configuración GR]
 *     description: Actualiza una configuración GR existente utilizando los datos enviados en el cuerpo de la solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la configuración GR.
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             description: Datos de la configuración GR que se desean actualizar.
 *     responses:
 *       200:
 *         description: Configuración actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Actualizado"
 *                 data:
 *                   type: object
 *       404:
 *         description: Configuración no encontrada.
 *       500:
 *         description: Error actualizando.
 */
router.put(
  "/config-gr/:id",
  updateConfigGr
);

/**
 * @swagger
 * /api/config-gr/{id}:
 *   delete:
 *     summary: Eliminar configuración GR
 *     tags: [Configuración GR]
 *     description: Elimina una configuración GR existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la configuración GR.
 *         example: 1
 *     responses:
 *       200:
 *         description: Configuración eliminada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Eliminado"
 *       404:
 *         description: Configuración no encontrada.
 *       500:
 *         description: Error eliminando.
 */
router.delete(
  "/config-gr/:id",
  deleteConfigGr
);

module.exports = router;