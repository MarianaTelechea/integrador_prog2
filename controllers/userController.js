const db = require('../database/models');
const OP = db.Sequelize.Op;

// LOGIN ------------------------------------
let moduloLogin = require('../modulo-login'); 

// ENCRIPTACIÓN DE PASS ----------------------------------------

const bcrypt = require('bcryptjs');
let passEncriptada = bcrypt.hashSync('root', 10);    

// ----------------------------------------- FIN DE ENCRIPTACIÓN

module.exports = {

    listado:function(req, res){
        db.Usuario.findAll()
            .then(usuarios => {
                res.render("usuarios", {usuarios:usuarios})
            })
            .catch(error => {
                return res.send (error);
            })
    },

    detalle: function(req, res){
        db.Usuario.findByPk(req.params.id,{
            include: [{association: "resenas"}]
        })
        .then(unUser => {
            res.render("detalle_user", {unUser:unUser})
        })
        .catch(error => {
            return res.send (error);
        })
    }


};