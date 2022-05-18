const { Router } = require("express");

const { usuariosGet } = require("../controllers/userController");

const router = Router();

router.get("/", usuariosGet);

module.exports = router;
