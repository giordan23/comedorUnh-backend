const { Router } = require("express");

const { getEstudiantes, postEstudiante } = require("../controllers/estudianteController");

const router = Router();

router.get("/", getEstudiantes);

router.post('/', postEstudiante)

module.exports = router;
