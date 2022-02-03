const bcryptjs = require("bcryptjs");
const {request,response} = require("express");
const Usuario = require("../models/usuario");

const usariosGet = async (req=request, res=response) => {
    //const {nombre= "No name", edad} = req.query;
    const query = {estado:true};
    const {limite=3, desde=0} = req.query;
    //const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limite));
    //const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        msg: "Api get  - controller - controller",
        total,
        usuarios
    });
};

const usariosPost = async (req, res=response) => {
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar base de datos
    await usuario.save();

    res.json({
        msg: "Api post  - controller",
        usuario
    });
};

const usariosPut = async (req, res=response) => {

    const id = req.params.id;
    const {_id, password, google, correo,...resto} = req.body;

    //validar
    if (password){
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    
    //Guardar base de datos
    //await usuario.save();

    res.json({
        msg: "Api put  - controller",
        id,
        usuario
    });
};

const usariosPatch =(req, res=response) => {
    res.json({
        msg: "Api pacth  - controller"
    });
};

const usariosDelete = async (req, res=response) => {

    const { id } =req.params;

    //Borrar Fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    //const usarioAutenticado = req.usuario;

    res.json({
        msg: "Api delete  - controller",
        usuario,
        //usarioAutenticado
    });
};

module.exports = {
    usariosGet,
    usariosPost,
    usariosPut,
    usariosPatch,
    usariosDelete
}