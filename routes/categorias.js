const {Router} = require("express");
const {check} = require("express-validator");
const { 
    categoriasPost,
    categoriasGet, 
    obtenerCategoria,
    categoriasPut,
    categoriasDelete
} = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validators");
const { validarJWT,validarCampos } = require("../Middlewares/index");
const router = Router();

// {{url}}/api/categorias

//Crear una categoria
router.post("/",[
    validarJWT,
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    validarCampos,
],categoriasPost);

//Obtener todas las categorias
router.get("/",categoriasGet);

//Obtener categoria por ID
router.get("/:id",[
    check("id","El id no es validos").isMongoId(),
    check("id").custom(existeCategoria),
    //check("id").custom((id)=> existeCategoria(id)),
    validarCampos,
],obtenerCategoria);

//Actualizar una categoria
router.put("/:id",[
    validarJWT,
    //check("id","El id no es validos").isMongoId(),
    check("id").custom((id)=> existeCategoria(id)),
    //check("id").custom(existeCategoria),
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    validarCampos,
],categoriasPut);

//Elimar una categoria
router.delete("/:id",[
    validarJWT,
    check("id","El id no es valido").isMongoId(),
    check("id").custom((id)=> existeCategoria(id)),
    //check("id").custom(existeCategoria),
    validarCampos,
],categoriasDelete);

module.exports = router;