const { Router } = require("express");

const { getUsuarios } = require("../controllers/userController");

const router = Router();

router.get("/", getUsuarios);

module.exports = router;
