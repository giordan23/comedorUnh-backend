const { Router } = require("express");
const { check } = require("express-validator");

const Pedido = require('../models/pedido');

const { validarCampos } = require("../middlewares/validar-campos");

const { getPedidos, postPedido } = require("../controllers/pedidoController");

const router = Router();

router.get("/", getPedidos);

router.post('/', [
    check('turno', 'El campo username es obligatorio').not().isEmpty(),
    check('turno').custom(async (turno = '') => {
        const enumValues = await Pedido.getAttributes().turno.values
        if (!enumValues.includes(turno)) {
            return Error(`El turno ${turno} no es valido`);
        }
    }),
    validarCampos
], postPedido)

module.exports = router;
