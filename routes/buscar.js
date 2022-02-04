const { Router } = require("express");
const {
    buscar1,
    buscar2,
    buscar3
} = require("../controllers/buscar");

const router = Router();

router.get("/consulta1", buscar1);

router.get("/consulta2", buscar2);

router.get("/consulta3", buscar3);

module.exports = router;