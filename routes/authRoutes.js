const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { Router } = require("express");
const { login } = require("../controllers/authController");

const router = Router();

router.post("/login",[
    check('username', 'El campo username es obligatorio').not().isEmpty(),
    check('password', 'El campo password es obligatorio').not().isEmpty(),
    validarCampos
], login);


module.exports = router;
