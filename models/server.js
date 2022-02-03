const express = require("express");
const cors = require("cors");
const { dbconection } = require("../DB/config");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths ={ 
            auth :       "/api/auth",
            buscar :     "/api/buscar",
            categorias : "/api/categorias",
            productos :  "/api/productos",
            usuarios :   "/api/usuarios",
        }

        //Conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middleware();
        //Rutas de la app
        this.router();
    }
    
    async conectarDB(){
        await dbconection();
    }

    middleware(){
        //Cors
        this.app.use(cors());

        //Lectura y Parceo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static("public"));
    }

    router(){
        
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.usuarios, require("../routes/user"));
        this.app.use(this.paths.categorias, require("../routes/categorias"));
        this.app.use(this.paths.productos, require("../routes/productos"));
        this.app.use(this.paths.buscar, require("../routes/buscar"));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("App listening in port:",this.port);
        });
    }
}

module.exports = Server;