const { response } = require("express");
const { client } = require("../DB/config");

//Pregunta 1
//Número de retrasos de salida y de llegada (ArrDelay, DepDelay) por ruta.
const buscar1 = async (req, res = response) => {
    const { viaje } = req.query; //req.params
    let viaje_peticion = "";
    if (viaje == "salida") {
        viaje_peticion = "dep_delay"
    }
    if (viaje == "llega") {
        viaje_peticion = "arr_delay"
    }
    //client.execute(query, ['someone']);

    const query = 'SELECT origin, dest,' + 'sum(' + viaje_peticion + ')' + ' from aeropuertos group by origin, dest';
    //const query = 'SELECT * from aeropuertos';
    const result = await client.execute(query);
    const cont = result.rows.length;
    return res.status(400).json({
        msg: "Consulta",
        result: result.rows,
        cont
    });
}

//Pregunta 2
//Número de retrasos de salida y de llegada (ArrDelay, DepDelay) por aerolínea.
const buscar2 = async (req, res = response) => {
    const { coleccion, termino } = req.params;
    //client.execute(query, ['someone']);

    const query = 'SELECT * from aeropuertos';
    const result = await client.execute(query);

    return res.status(400).json({
        msg: "Consulta",
        result: result.rows
    });
}

//Pregunta 3
//Número de retrasos por aerolínea (CarrierDelay) y por condiciones climáticas (WeatherDelay), por ruta.
const buscar3 = async (req, res = response) => {
    const { coleccion, termino } = req.params;
    //client.execute(query, ['someone']);

    const query = 'SELECT * from aeropuertos';
    const result = await client.execute(query);

    return res.status(400).json({
        msg: "Consulta",
        result: result.rows
    });
}

module.exports = {
    buscar1,
    buscar2,
    buscar3
}