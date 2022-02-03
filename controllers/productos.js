const {response} = require("express");
const {Producto} = require("../models/");

//Crear productos
const productosPost = async (req, res=response) => {
    
    const {estado, usuario, ...body} = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre});

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    const data ={
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
        ...body
        //categoria: req.categoria._id,
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json({
        msg: "Api post  - controller",
        producto
    });
};

//obtener productos
const productosGet = async (req, res=response) => {
    
        const query = {estado:true};
        const {limite=100, desde=0} = req.query;
    
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
            .populate("usuario","nombre")
            .populate("categoria","nombre")
            .skip(Number(desde)).limit(Number(limite))
        ]);
    
        res.json({
            msg: "Api get  - controller",
            total,
            productos
        });
};

const obtenerProducto = async (req, res=response) => {
    
    const {id} = req.params;
    const producto = await Producto.findById(id)
        .populate("usuario","nombre")
        .populate("categoria","nombre");

    res.json({
        msg: "Api get - get controller",
        producto
    });
};

//Altualizar productos
const productosPut = async (req, res=response) => {

    const {id}= req.params;
    const {estado, usuario,...data} = req.body;

    if (data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true});
    //const producto = await Producto.findByIdAndUpdate(id, data);

    res.json({
        msg: "Api put  - controller",
        producto,
    });
};

//Borrar productos
const productosDelete = async (req, res=response) => {

    const {id}= req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado:false},{new:true});

    res.json({
        msg: "Api delete  - controller",
        producto,
    });
};

module.exports = {
    productosPost,
    productosGet,
    obtenerProducto,
    productosPut,
    productosDelete
}