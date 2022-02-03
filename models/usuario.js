const {Schema, model} = require("mongoose");

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        require:[true, "El nombre es requerido"]
    },
    correo:{
        type: String,
        require:[true, "El correo es requerido"],
        unique: true
    },
    password:{
        type: String,
        require:[true, "La contraseña es requerido"]
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        require:[true, "El rol es requerido"],
        enum: ['Admin_Role','User_Role']
    },
    estado:{
        type: Boolean,
        default: false
    },
    google:{
        type: Boolean,
        default: false
    }
});

//metodo para eliminar cosas del objeto JSON
UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject();
    usuario.uid=_id;
    return usuario;
};

module.exports = model("Usuario", UsuarioSchema);