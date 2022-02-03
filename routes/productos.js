const {Router} = require("express");
const {check} = require("express-validator");
const { 
    productosPost,
    productosGet, 
    obtenerProducto,
    productosPut,
    productosDelete
} = require("../controllers/productos");
const { existeProducto, existeCategoria } = require("../helpers/db-validators");
const { validarJWT,validarCampos } = require("../Middlewares/index");
const router = Router();

// {{url}}/api/productos

//Crear un producto
router.post("/",[
    validarJWT,
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    //check("categoria","No es id de Mongo").isMongoId(),
    check("categoria").custom((categoria)=> existeCategoria(categoria)),
    validarCampos,
],productosPost);

//Obtener todas las productos
router.get("/",productosGet);

//Obtener producto por ID
router.get("/:id",[
    check("id","El id no es validos").isMongoId(),
    check("id").custom((id)=> existeProducto(id)),
    //check("id").custom(existeProducto),
    validarCampos,
],obtenerProducto);

//Actualizar un producto
router.put("/:id",[
    validarJWT,
    check("id","El id no es validos").isMongoId(),
    check("id").custom((id)=> existeProducto(id)),
    //check("id").custom(existeProducto),
    validarCampos,
],productosPut);

//Elimar un producto
router.delete("/:id",[
    validarJWT,
    check("id","El id no es valido").isMongoId(),
    check("id").custom((id)=> existeProducto(id)),
    //check("id").custom(existeproducto),
    validarCampos,
],productosDelete);

module.exports = router;