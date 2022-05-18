const { Router } = require("express");
const { check } = require("express-validator");

const { getUsuarios, postUsuario } = require("../controllers/usuarioController");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", getUsuarios);

router.post('/', [
    check('username', 'El campo username es obligatorio').not().isEmpty(),
    check('password', 'El campo password es obligatorio').not().isEmpty(),
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    validarCampos
], postUsuario)

module.exports = router;
