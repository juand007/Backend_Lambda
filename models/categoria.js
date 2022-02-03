const {Schema, model} = require("mongoose");

const CategoriaSchema = Schema({
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
    usuario:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        require:[true, "Las categorias deben tener un usuario"]
    },
});

//metodo para eliminar cosas del objeto JSON
CategoriaSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
};

module.exports = model("Categoria", CategoriaSchema);