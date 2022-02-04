require('dotenv').config();
const cassandra = require('cassandra-driver');

const url = process.env.URL;
const localDataCenter = process.env.LOCAL_DATA_CENTER;
const user = process.env.CASSANDRA_USER;
const pass = process.env.CASSANDRA_PASS;
const keyspace = process.env.KEYSPACE;

const client = new cassandra.Client({
    contactPoints: [url],
    localDataCenter:localDataCenter,
    authProvider: new cassandra.auth.PlainTextAuthProvider(user, pass),
    keyspace:keyspace
});

const dbconection = async () => {
    try {
        await client.connect();
        console.log("Base de datos ONline");
    } catch (error) {
        throw new Error("Error al iniciar la base de datos");
    }
}

module.exports = {
    dbconection,
    client
}