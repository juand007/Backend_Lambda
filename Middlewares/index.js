const validarJWT  = require("../Middlewares/validar-jwt");
const validarCampos = require("../Middlewares/validar-Campos");
const validarRoles = require("../Middlewares/validar-roles");

//Se exporta todo de los archivos AA.js
module.exports ={
    ...validarJWT,
    ...validarCampos,
    ...validarRoles
}