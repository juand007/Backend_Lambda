const { Usuario, Categoria, Rol, Producto  } = require("../models");

//verificar si el rol existe 
const rolValido = async (rol = "") =>{
    const existeRol = await Rol.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta Registrado`);
    }
}

//verificar si el correo existe
const emailDisponible = async (correo = "")=>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

//verificar si existe un usuario por id
const existe_IdUsuario = async (id = "")=>{
    const existeEmail = await Usuario.findById(id);
    if (!existeEmail){
        throw new Error(`El id ${id} no existe`);
    }
}

//verificar si existe una categoria por id
const existeCategoria = async (id = "")=>{
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria || existeCategoria.estado == false){
        throw new Error(`El id ${id} no existe (validation)`);
    }
}

//verificar si existe un producto por id
const existeProducto = async (id = "")=>{
    const existeProducto = await Producto.findById(id);
    if (!existeProducto || existeProducto.estado == false){
        throw new Error(`El id ${id} no existe (validation)`);
    }
}
module.exports = {
    rolValido,
    emailDisponible,
    existe_IdUsuario,
    existeCategoria,
    existeProducto
}