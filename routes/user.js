const {Router} = require("express");
const {check} = require("express-validator");

/* const { validarJWT } = require("../Middlewares/validar-jwt");
const {validarCampos} = require("../Middlewares/validar-Campos");
const { esAdminRole, tieneRol } = require("../Middlewares/validar-roles"); */

const {
    validarJWT,
    validarCampos,
    esAdminRole, 
    tieneRol 
} = require("../Middlewares/index");

const {rolValido,emailDisponible,existe_IdUsuario} = require("../helpers/db-validators");

const {
    usariosGet,
    usariosPost,
    usariosPut,
    usariosPatch,
    usariosDelete} = require("../controllers/user");

const router = Router();

router.get('/', usariosGet);

router.post('/', [
    check("nombre","El Nombre es obligatorio").not().isEmpty(),
    check("password","El password debe ser mas de 4 letas").isLength({min:6}),
    check("correo","No es un correo valido").isEmail(),
    //check("rol","No es un rol valido").isIn(["Admin_Role","User_Role"]),
    //check("rol").custom(rolvalido),
    check("correo").custom((correo)=> emailDisponible(correo)),
    check("rol").custom((rol)=> rolValido(rol)),
    validarCampos
],usariosPost);

router.put('/:id', [
    check("id","No es un id valido").isMongoId(),
    check("id").custom((id)=> existe_IdUsuario(id)),
    check("rol").custom((rol)=> rolValido(rol)),
    validarCampos
],usariosPut);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRol("Admin_Role","Ventas_Role"),
    check("id","No es un id valido").isMongoId(),
    check("id").custom((id)=> existe_IdUsuario(id)),
    validarCampos
],usariosDelete);

router.patch('/', usariosPatch);

module.exports = router;