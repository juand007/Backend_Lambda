const mongoose = require ("mongoose");

const dbconection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            //useFindAndModify: false
        });
        console.log("Base de datos ONline");
    } catch (error) {
        throw new Error("Error al iniciar la base de datos");
    }
}

module.exports ={
    dbconection
}