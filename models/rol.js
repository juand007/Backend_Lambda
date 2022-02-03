const {Schema, model} = require("mongoose");

const RoleSchema = Schema({
    rol:{
        type: String,
        require:[true, "El rol es requerido"]
    }
});

module.exports = model("Role", RoleSchema);