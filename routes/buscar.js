const { Router } = require("express");
const {
    buscar0,
    buscar1,
    buscar2,
    buscar3
} = require("../controllers/buscar");

const router = Router();

router.get("/aeropuertos", buscar0);

router.get("/consulta1", buscar1);

router.get("/consulta2", buscar2);

router.get("/consulta3", buscar3);

module.exports = router;