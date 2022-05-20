const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { getPedidos, postPedido } = require("../controllers/pedidoController");

const router = Router();

router.get("/", getPedidos);

router.post('/', [
    check('turno', 'El campo username es obligatorio').not().isEmpty(),
    validarCampos
], postPedido)

module.exports = router;
