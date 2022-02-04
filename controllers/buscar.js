const { response } = require("express");
const { Aeropuerto } = require("../models");

//Api Aeropuertos
const buscar0 = async (req, res = response) => {
    const result = await Aeropuerto.distinct('aeropuerto');

    return res.status(200).json({
        msg: "Api get aeropuertos",
        data: result
    });
}

//Pregunta 1
//Número de retrasos de salida y de llegada (ArrDelay, DepDelay) por ruta.
const buscar1 = async (req, res = response) => {
    const { viaje, desde = 0, limite = 100 } = req.query; //req.params

    // viaje == "salida"
    let viaje_peticion = "dep_delay";
    let name = "retraso_salida";

    if (viaje == "llegada") {
        viaje_peticion = "arr_delay";
        name = "retraso_llegada";
    }

    const query = [
        {
            "$group": {
                "_id": {
                    'origen': '$origen',
                    'destino': '$destino'
                },
                [name]: {
                    "$sum": `$${viaje_peticion}`
                }
            }
        }
    ];
    const result = await Aeropuerto.aggregate(query).skip(Number(desde)).limit(Number(limite));
    const result_format = result.map(item => ({
        origen: item._id.origen,
        destino: item._id.destino,
        [name]: item[name]
    }));

    return res.status(200).json({
        msg: "Respuesta P1",
        viaje: name,
        data: result_format
    });
}

//Pregunta 2
//Número de retrasos de salida y de llegada (ArrDelay, DepDelay) por aerolínea.
const buscar2 = async (req, res = response) => {
    const { viaje, desde = 0, limite = 100 } = req.query; //req.params

    // viaje == "salida"
    let name = "retraso_salida";
    let viaje_peticion = "dep_delay";

    if (viaje == "llegada") {
        name = "retraso_llegada";
        viaje_peticion = "arr_delay";
    }

    const query = [
        {
            "$group": {
                "_id": {
                    'aerolinea_code': "$aeropuerto",
                    'aerolinea': "$carrier",
                },
                [name]: {
                    "$sum": `$${viaje_peticion}`
                }
            }
        }
    ];
    const result = await Aeropuerto.aggregate(query).skip(Number(desde)).limit(Number(limite));
    const result_format = result.map(item => {
        if (!!item._id.aerolinea_code == false) {
            item._id.aerolinea_code = "Otro";
        }
        if (!!item._id.aerolinea == false) {
            item._id.aerolinea = "Otro";
        }
        return {
            aerolinea_code: item._id.aerolinea_code,
            aerolinea: item._id.aerolinea,
            [name]: item[name]
        };
    });

    return res.status(200).json({
        msg: "Respuesta P2",
        viaje: name,
        data: result_format
    });
}

//Pregunta 3
//Número de retrasos por aerolínea (CarrierDelay) y por condiciones climáticas (WeatherDelay), por ruta.
const buscar3 = async (req, res = response) => {
    const { viaje, desde = 0, limite = 100 } = req.query; //req.params

    // viaje == "aerolinea"
    let viaje_peticion = "carrier_delay";
    let name = "retraso_aerolinea";

    if (viaje == "clima") {
        viaje_peticion = "weather_delay";
        name = "retraso_clima";
    }

    const query = [
        {
            "$group": {
                "_id": {
                    'aerolinea': "$carrier",
                    'origen': '$origen',
                    'destino': '$destino'
                },
                [name]: {
                    "$sum": `$${viaje_peticion}`
                }
            }
        }
    ];
    const result = await Aeropuerto.aggregate(query).skip(Number(desde)).limit(Number(limite));
    const result_format = result.map(item => ({
        aerolinea: item._id.aerolinea,
        origen: item._id.origen,
        destino: item._id.destino,
        [name]: item[name]
    }));

    return res.status(200).json({
        msg: "Respuesta P3",
        viaje: name,
        data: result_format
    });
}

module.exports = {
    buscar0,
    buscar1,
    buscar2,
    buscar3
}