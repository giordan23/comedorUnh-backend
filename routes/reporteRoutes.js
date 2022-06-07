const { Router } = require("express");
const { getReporte } = require("../controllers/reportesController");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [validarJWT], getReporte);

module.exports = router;
