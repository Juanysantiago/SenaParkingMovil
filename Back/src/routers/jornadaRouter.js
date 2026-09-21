const express = require("express");

const {
  createJornada,
  getJornadas,
} = require("../controllers/jornadaController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jornadas
 *   description: Gestión de jornadas de formación
 */

/**
 * @swagger
 * /api/jornada:
 *   post:
 *     summary: Crear una jornada
 *     tags: [Jornadas]
 *     description: Crea una nueva jornada de formación en el sistema SENAPARKING.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sigla_jornada
 *               - nombre_jornada
 *             properties:
 *               sigla_jornada:
 *                 type: string
 *                 description: Sigla que identifica la jornada.
 *                 example: "DIU"
 *               nombre_jornada:
 *                 type: string
 *                 description: Nombre de la jornada.
 *                 example: "Diurna"
 *               descripcion:
 *                 type: string
 *                 nullable: true
 *                 description: Descripción de la jornada.
 *                 example: "Jornada de formación diurna"
 *               imagen_url:
 *                 type: string
 *                 nullable: true
 *                 description: URL de la imagen asociada a la jornada.
 *                 example: "https://ejemplo.com/jornada-diurna.jpg"
 *               estado:
 *                 type: string
 *                 nullable: true
 *                 description: Estado de la jornada.
 *                 example: "Activo"
 *     responses:
 *       201:
 *         description: Jornada creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Jornada creada correctamente"
 *                 data:
 *                   type: object
 *       400:
 *         description: Sigla o nombre de jornada no proporcionados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sigla y nombre de jornada son obligatorios"
 *       409:
 *         description: Ya existe una jornada con esa sigla.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ya existe una jornada con esa sigla"
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/jornada", createJornada);

/**
 * @swagger
 * /api/jornada:
 *   get:
 *     summary: Obtener todas las jornadas
 *     tags: [Jornadas]
 *     description: Obtiene todas las jornadas registradas en el sistema.
 *     responses:
 *       200:
 *         description: Jornadas obtenidas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       sigla_jornada:
 *                         type: string
 *                         example: "DIU"
 *                       nombre_jornada:
 *                         type: string
 *                         example: "Diurna"
 *                       descripcion:
 *                         type: string
 *                         nullable: true
 *                         example: "Jornada de formación diurna"
 *                       imagen_url:
 *                         type: string
 *                         nullable: true
 *                         example: "https://ejemplo.com/jornada-diurna.jpg"
 *                       estado:
 *                         type: string
 *                         nullable: true
 *                         example: "Activo"
 *       500:
 *         description: Error al obtener las jornadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener jornadas"
 */
router.get("/jornada", getJornadas);

module.exports = router;