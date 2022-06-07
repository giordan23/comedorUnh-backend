const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req = request, res = response, next) => {
  const bearerHeader = req.header("Authorization");
  const token = bearerHeader.replace('Bearer ','');
//   console.log(token);

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (error) {
    console.log(error);
    return res.status(401).json("Token no valido");
  }
  next();
};

module.exports = {
  validarJWT,
};
