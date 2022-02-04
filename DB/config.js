const mongoose = require("mongoose");

const dbconection = async () => {
    try {
        mongoose.connect("mongodb://167.172.141.225/bigdata", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false
        });
        
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
            console.log("Connected successfully");
        });

        console.log("Base de datos Online");
    } catch (error) {
        throw new Error("Error al iniciar la base de datos");
    }
}

module.exports = {
    dbconection
}