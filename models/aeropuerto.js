const {Schema, model} = require("mongoose");

const AeropuertoSchema = Schema({
    aeropuerto:{
        type: String
    },
    arr_delay:{
        type: Number
    },
    dep_delay:{
        type: Number
    },
    origin_code:{
        type: String
    },
    dest_code:{
        type: String
    },
    carrier_delay:{
        type: Number
    },
    weather_delay:{
        type: Number
    },
    origen:{
        type: String
    },
    destino:{
        type: String
    },
    carrier:{
        type: String
    }
});

//metodo para eliminar cosas del objeto JSON
/* AeropuertoSchema.methods.toJSON = function(){
    const {__v, estado, ...data} = this.toObject();
    return data;
}; */

module.exports = model("Airports", AeropuertoSchema);