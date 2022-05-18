const {response} = require('express')

const usuariosGet =(req, res = response) => {
    res.json({
        msg: 'get API - Controlador'
    });
}

module.exports = {
    usuariosGet
}