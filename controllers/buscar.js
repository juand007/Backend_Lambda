const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const {Usuario,Categoria, Producto} = require("../models/");

const colleciones = ["categorias", "productos","usuarios", "roles"];

const buscarUsuarios = async ( termino="", res = response) =>{
    
    const idMongo = ObjectId.isValid(termino);

    if (idMongo) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp( termino, "i");

    //const usuarios = await Usuario.find({nombre: regex});
    //Cumpla A y B [{ nombre: regex, correo: regex  }] 
    //Cumpla A ó B [{ nombre: regex},{ correo: regex  }] 
    const usuarios = await Usuario.find({  //.count para contar los resultados
        $or: [{ nombre: regex }, {correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });
}

const buscarCategorias = async ( termino="", res = response) =>{
    
    const idMongo = ObjectId.isValid(termino);

    if (idMongo) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regex = new RegExp( termino, "i");

    const categorias = await Categoria.find({nombre: regex, estado:true});

    res.json({
        results: categorias
    });
}

const buscarProductos = async ( termino="", res = response) =>{
    
    const idMongo = ObjectId.isValid(termino);

    if (idMongo) {
        const producto = await Producto.findById(termino)
        .populate("categoria","nombre");
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regex = new RegExp( termino, "i");

    const productos = await Producto.find({nombre: regex, estado:true})
    .populate("categoria","nombre");

    res.json({
        results: productos
    });
}

/*Para buscar productos que esten en una categoria
    {categoria: ObjectId("165456DASD")}
*/
const buscar = (req, res = response)=>{

    const {coleccion,termino} = req.params;

    if (!colleciones.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${colleciones}`
        });
    }

    switch (coleccion) {
        case "usuarios": 
            buscarUsuarios(termino, res);
        break;

        case "categorias":
            buscarCategorias(termino, res);
        break;

        case "productos":
            buscarProductos(termino, res);
        break;

        case "roles":
        break;

        default:
            return res.status(500).json({
                msg: `Esta busqueda no esta hecha`
            })
    }
}

module.exports = {
    buscar
}