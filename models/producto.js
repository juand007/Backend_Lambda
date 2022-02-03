const {Schema, model} = require("mongoose");

const ProductoSchema = Schema({
    nombre:{
        type: String,
        require:[true, "El nombre es requerido"],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        require:[true, "El correo es requerido"],
    },
    precio:{
        type: Number,
        default: 0
    },
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean,
        default: true
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        require:[true, "Los productos deben tener una categoria"]
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        require:[true, "Las categorias deben tener un usuario"]
    },
});

//metodo para eliminar cosas del objeto JSON
ProductoSchema.methods.toJSON = function(){
    const {__v, estado, ...data} = this.toObject();
    return data;
};

module.exports = model("Producto", ProductoSchema);