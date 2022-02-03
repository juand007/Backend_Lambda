const {request,response} = require("express");
const {Categoria} = require("../models/");

//Crear categorias
const categoriasPost = async (req, res=response) => {
    
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    const data ={
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json({
        msg: "Api post  - controller",
        categoria
    });
};

//obtener categorias
const categoriasGet = async (req, res=response) => {
    
        const query = {estado:true};
        const {limite=3, desde=0} = req.query;
    
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
            .populate("usuario","nombre")
            .skip(Number(desde)).limit(Number(limite))
        ]);
    
        res.json({
            msg: "Api get  - controller - controller",
            total,
            categorias
        });
};

const obtenerCategoria = async (req, res=response) => {
    
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate("usuario","nombre");

    res.json({
        msg: "Api get - get categoria",
        categoria
    });
};

//Altualizar categorias
const categoriasPut = async (req, res=response) => {

    const {id}= req.params;
    const {estado, usuario,...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});
    //const categoria = await Categoria.findByIdAndUpdate(id, data);

    res.json({
        msg: "Api put  - controller",
        categoria,
    });
};

//Borrar categorias
const categoriasDelete = async (req, res=response) => {

    const {id}= req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false},{new:true});

    res.json({
        msg: "Api delete  - controller",
        categoria,
    });
};

module.exports = {
    categoriasPost,
    categoriasGet,
    obtenerCategoria,
    categoriasPut,
    categoriasDelete
}