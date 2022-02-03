const {response} = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");

const login = async(req,res=response)=>{

    const {correo, password} =req.body;

    try {
        //verificar si existe el correo
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos (correo)"
            });
        }
        //si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos (eliminado)"
            });
        }

        //verificar contraseña
        const validarPass = bcryptjs.compareSync(password,usuario.password);
        if (!validarPass){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos (password)"
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg:"Login ok",
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Habla con el administrador"
        });
    };
};

module.exports = {login};