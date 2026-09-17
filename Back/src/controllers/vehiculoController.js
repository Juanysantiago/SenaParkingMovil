const Vehiculo = require("../models/Vehiculo");
const { User, CentroFormacion } = require("../models");

// =====================================================
// CREAR VEHÍCULO
// =====================================================
const createVehiculo = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      });
    }

    const {
      tipo,
      id_centro_de_formacion,
      marca,
      color,
      serial,
      placa,
      cilindraje,
      modelo,
      foto_principal,
      foto_secundaria,
    } = req.body;

    if (!tipo) {
      return res.status(400).json({
        message: "Tipo obligatorio",
      });
    }

    if (!id_centro_de_formacion) {
      return res.status(400).json({
        message: "Centro de formación obligatorio",
      });
    }

    if (!marca) {
      return res.status(400).json({
        message: "Marca obligatoria",
      });
    }

    const nuevo = await Vehiculo.create({
      tipo,
      id_centro_de_formacion,
      marca,
      color,
      serial,
      placa,
      cilindraje,
      modelo,
      foto_principal,
      foto_secundaria,

      // IMPORTANTE:
      // El propietario SIEMPRE es el usuario autenticado.
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "Vehículo creado correctamente",
      data: nuevo,
    });
  } catch (error) {
    console.error("ERROR CREANDO VEHÍCULO:", error);

    return res.status(500).json({
      message: "Error creando vehículo",
      error: error.message,
    });
  }
};

// =====================================================
// OBTENER TODOS LOS VEHÍCULOS
// SOLO PARA ADMINISTRADOR
// =====================================================
const getVehiculos = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      });
    }

    // Un aprendiz no debe poder obtener todos los vehículos.
    if (req.user.rol !== "administrador") {
      return res.status(403).json({
        message: "No tienes permisos para consultar todos los vehículos",
      });
    }

    const data = await Vehiculo.findAll({
      include: [
        {
          model: User,
          as: "User",
          attributes: [
            "id",
            "nombres",
            "apellidos",
            "ficha",
            "documento",
            "tipoDocumento",
            "email",
            "celular",
            "centroFormacionId",
            "fechaVinculacion",
            "fechaFinalizacion",
            "foto",
          ],
          include: [
            {
              model: CentroFormacion,
              as: "centroFormacion",
              attributes: ["id", "nombre"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      total: data.length,
      data,
    });
  } catch (error) {
    console.error("ERROR OBTENIENDO VEHÍCULOS:", error);

    return res.status(500).json({
      message: "Error obteniendo vehículos",
      error: error.message,
    });
  }
};

// =====================================================
// OBTENER MIS VEHÍCULOS
// SOLO VEHÍCULOS DEL USUARIO AUTENTICADO
// =====================================================
const getMisVehiculos = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      });
    }

    const userId = req.user.id;

    const vehiculos = await Vehiculo.findAll({
      where: {
        userId: userId,
      },

      include: [
        {
          model: User,
          as: "User",
          attributes: [
            "id",
            "nombres",
            "apellidos",
            "documento",
            "tipoDocumento",
            "email",
            "celular",
            "ficha",
            "centroFormacionId",
            "foto",
          ],
          include: [
            {
              model: CentroFormacion,
              as: "centroFormacion",
              attributes: [
                "id",
                "nombre",
                "ciudad",
                "direccion",
              ],
            },
          ],
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      total: vehiculos.length,
      data: vehiculos,
    });
  } catch (error) {
    console.error("ERROR OBTENIENDO MIS VEHÍCULOS:", error);

    return res.status(500).json({
      message: "Error obteniendo mis vehículos",
      error: error.message,
    });
  }
};

// =====================================================
// OBTENER VEHÍCULO POR ID
// =====================================================
const getVehiculoById = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      });
    }

    const vehiculo = await Vehiculo.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "User",
          attributes: [
            "id",
            "nombres",
            "apellidos",
            "documento",
            "tipoDocumento",
            "email",
            "celular",
            "ficha",
            "centroFormacionId",
            "foto",
          ],
        },
      ],
    });

    if (!vehiculo) {
      return res.status(404).json({
        message: "Vehículo no encontrado",
      });
    }

    // Si NO es administrador, solamente puede consultar
    // vehículos que le pertenecen.
    if (
      req.user.rol !== "administrador" &&
      Number(vehiculo.userId) !== Number(req.user.id)
    ) {
      return res.status(403).json({
        message: "No tienes permiso para consultar este vehículo",
      });
    }

    return res.status(200).json({
      data: vehiculo,
    });
  } catch (error) {
    console.error("ERROR OBTENIENDO VEHÍCULO:", error);

    return res.status(500).json({
      message: "Error obteniendo vehículo",
      error: error.message,
    });
  }
};

// =====================================================
// ACTUALIZAR VEHÍCULO
// =====================================================
const updateVehiculo = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      });
    }

    const vehiculo = await Vehiculo.findByPk(req.params.id);

    if (!vehiculo) {
      return res.status(404).json({
        message: "Vehículo no encontrado",
      });
    }

    // Un aprendiz solamente puede modificar SUS vehículos.
    if (
      req.user.rol !== "administrador" &&
      Number(vehiculo.userId) !== Number(req.user.id)
    ) {
      return res.status(403).json({
        message: "No tienes permiso para modificar este vehículo",
      });
    }

    // Evitamos que un aprendiz cambie el propietario
    // enviando otro userId desde Postman o la aplicación.
    const datosActualizacion = {
      ...req.body,
    };

    delete datosActualizacion.userId;

    await vehiculo.update(datosActualizacion);

    return res.status(200).json({
      message: "Vehículo actualizado correctamente",
      data: vehiculo,
    });
  } catch (error) {
    console.error("ERROR ACTUALIZANDO VEHÍCULO:", error);

    return res.status(500).json({
      message: "Error actualizando vehículo",
      error: error.message,
    });
  }
};

// =====================================================
// ELIMINAR VEHÍCULO
// =====================================================
const deleteVehiculo = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      });
    }

    const vehiculo = await Vehiculo.findByPk(req.params.id);

    if (!vehiculo) {
      return res.status(404).json({
        message: "Vehículo no encontrado",
      });
    }

    // Un aprendiz solamente puede eliminar SUS vehículos.
    if (
      req.user.rol !== "administrador" &&
      Number(vehiculo.userId) !== Number(req.user.id)
    ) {
      return res.status(403).json({
        message: "No tienes permiso para eliminar este vehículo",
      });
    }

    await vehiculo.destroy();

    return res.status(200).json({
      message: "Vehículo eliminado correctamente",
    });
  } catch (error) {
    console.error("ERROR ELIMINANDO VEHÍCULO:", error);

    return res.status(500).json({
      message: "Error eliminando vehículo",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORTACIONES
// =====================================================
module.exports = {
  createVehiculo,
  getVehiculos,
  getVehiculoById,
  updateVehiculo,
  deleteVehiculo,
  getMisVehiculos,
};