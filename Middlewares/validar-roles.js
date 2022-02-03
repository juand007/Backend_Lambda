const { response } = require("express");

const esAdminRole = (req, res=response, next)=>{
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Verificar role, se debe validar token primero"
        })
    }
    const {rol,nombre} = req.usuario;

    if (rol !== "Admin_Role") {
        return res.status(401).json({
            msg: `El usuario ${nombre} NO es administrador`
        })
    }
    next();
}

const tieneRol  = ( ...roles)=>{
    return  (req, res=response, next)=>{
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Verificar role, se debe validar token primero"
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                //rol: `Su rol es: ${req.usuario.rol}`,
                msg: `El servicio requiere uno de los roles: ${roles}`
            });
        }

        next();
    }
}

module.exports ={
    esAdminRole,
    tieneRol
}