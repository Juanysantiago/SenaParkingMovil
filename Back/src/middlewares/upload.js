const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// =================================================
// CREAR CARPETA DE CARGA SI NO EXISTE
// =================================================
const rutaCarga = path.join(process.cwd(), "uploads");

if (!fs.existsSync(rutaCarga)) {
  fs.mkdirSync(rutaCarga, {
    recursive: true,
  });
}

// =================================================
// CONFIGURACIÓN DEL ALMACENAMIENTO
// =================================================
const storage = multer.diskStorage({
  destination: (req, archivo, cb) => {
    cb(null, rutaCarga);
  },

  filename: (req, archivo, cb) => {
    const extension = path
      .extname(archivo.originalname)
      .toLowerCase();

    // Nombre único mediante aleatoriedad criptográfica
    const nombreArchivo =
      `${Date.now()}-${crypto.randomUUID()}${extension}`;

    cb(null, nombreArchivo);
  },
});

// =================================================
// TIPOS DE ARCHIVO PERMITIDOS
// =================================================
const tiposPermitidos = [
  // Imágenes
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",

  // PDF
  "application/pdf",

  // Word
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  // Excel
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  // Texto
  "text/plain",
];

// =================================================
// VALIDACIÓN DEL TIPO DE ARCHIVO
// =================================================
const fileFilter = (req, archivo, cb) => {
  if (!tiposPermitidos.includes(archivo.mimetype)) {
    return cb(
      new Error(
        `Tipo de archivo no permitido: ${archivo.mimetype}`
      )
    );
  }

  cb(null, true);
};

// =================================================
// CONFIGURACIÓN DE MULTER
// =================================================
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB // 10 MB por archivo
const MAX_FILES = 20;

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES,
    fields: 10,
    parts: 30,
  },
});
module.exports = upload;
