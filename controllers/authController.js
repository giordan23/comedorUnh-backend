const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario");

const login = async (req, res = response) => {
  const { username, password } = req.body;

  try {
    //validar si username existe
    const usuario = await Usuario.findOne({ where: { username } });
    if (!usuario) {
      return res.json({ msg: "Usuario o password incorrectos" });
    }

    //validar si password hace match
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.json({ msg: "Usuario o password incorrectos" });
    }

    //generar el jwt
    const token = await generarJWT(usuario.id)

    //respuesta al front
    res.json({
      msg: "login ok",
      usuario,
      token
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  login,
};
