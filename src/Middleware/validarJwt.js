const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJwt = (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }
  try {
    const { id, email } = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.id = id;
    req.email = email;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
  next();
};

module.exports = {
  validarJwt,
};
