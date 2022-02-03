const { response } = require("express")
const jwt = require("jsonwebtoken")

const Usuario = require("../models/usuario");

const validarJWT = async (req, res =response, next) => {
    const token =req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);
        
        //Validacion para el usuario logueado
        if (!usuario) {
            return res.status(401).json({
                msg: "Token no valido (usuario no existe))"
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Token no valido (usuario false))"
            })
        }

        req.usuario = usuario;

        next(); 

    } catch (error) {
        //console.log(error);
        return res.status(401).json({
            msg: "Token no valido (error)"
        })
    }
}

module.exports = {
    validarJWT
}