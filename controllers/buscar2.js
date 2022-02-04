const { response } = require("express");
const { client } = require("../DB/config2");

//Pregunta 1
//Número de retrasos de salida y de llegada (ArrDelay, DepDelay) por ruta.
const buscar1 = async (req, res = response) => {
    const { viaje, limit } = req.query; //req.params
    let viaje_peticion = "";
    let name = "";

    if (viaje == "salida") {
        viaje_peticion = "dep_delay";
        name = "Retraso_Salida";
    }
    if (viaje == "llegada") {
        viaje_peticion = "arr_delay";
        name = "Retraso_Llegada";
    }
    //const query = `select origen, destino, sum(${viaje_peticion}) as       from airports  vista_aerolinea
    const query = `select origen, destino, sum(${viaje_peticion}) as ${name} from airports group by origen, dest limit 100`; //airports
    //const query = `select * from airports`; //airports
    const result = await client.execute(query);

    return res.status(400).json({
        msg: "Respuesta P1",
        viaje: name,
        //resultados: result.rows.length,
        data: result.rows,
    });
}

//Pregunta 2
//Número de retrasos de salida y de llegada (ArrDelay, DepDelay) por aerolínea.
const buscar2 = async (req, res = response) => {
    const { viaje, limit } = req.query; //req.params
    let viaje_peticion = "";
    let name = "";
    let limite = 100;

    if (!!limit) {
        limite = limit;
    }

    if (viaje == "salida") {
        viaje_peticion = "dep_delay";
        name = "Retraso_Salida";
    }
    if (viaje == "llegada") {
        viaje_peticion = "arr_delay";
        name = "Retraso_Llegada";
    }

    const query = `select aerolinea as aerolinea_code, carrier as Aerolinea, sum(${viaje_peticion}) as ${name} from vista_aerolinea group by aerolinea limit ${limite}`;
    const result = await client.execute(query);

    return res.status(400).json({
        msg: "Respuesta P2",
        viaje: name,
        //resultados: result.rows.length,
        data: result.rows,
    });
}

//Pregunta 3
//Número de retrasos por aerolínea (CarrierDelay) y por condiciones climáticas (WeatherDelay), por ruta.
const buscar3 = async (req, res = response) => {
    const { viaje } = req.query; //req.params
    let viaje_peticion = "";
    let name = "";

    if (viaje == "aerolinea") {
        viaje_peticion = "carrier_delay";
        name = "Retraso_Aerolinea";
    }
    if (viaje == "clima") {
        viaje_peticion = "weather_delay";
        name = "Retraso_Clima";
    }

    //const query = `select origen, destino, sum(${viaje_peticion}) as ${name}                                          from  airports  vista_aerolinea
    const query = `select carrier as Aerolinea, origen as Origen, destino as Destino, sum(${viaje_peticion}) as ${name} from vista_aerolinea group by aerolinea, origen, dest limit 100`; //limit 100
    const result = await client.execute(query); //client.stream();

    return res.status(400).json({
        msg: "Respuesta P3",
        viaje: name,
        //resultados: result.rows.length,
        data: result.rows,
    });
}

module.exports = {
    buscar1,
    buscar2,
    buscar3
}