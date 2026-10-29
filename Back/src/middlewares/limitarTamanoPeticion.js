
const MAX_REQUEST_SIZE = 25 * 1024 * 1024; // 25 MB

const limitarTamanoPeticion = (req, res, next) => {
  const contentLength = req.headers["content-length"];

  if (contentLength === undefined) {
    return res.status(411).json({
      message: "La petición debe indicar su tamaño.",
    });
  }

  const tamano = Number(contentLength);

  if (
    !Number.isSafeInteger(tamano) ||
    tamano < 0 ||
    tamano > MAX_REQUEST_SIZE
  ) {
    return res.status(413).json({
      message: "La petición no puede superar los 25 MB.",
    });
  }

  next();
};

module.exports = limitarTamanoPeticion;
