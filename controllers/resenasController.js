// ------- PRUBA DOS DE RESEÑA ----------------------

const db = require('../database/models');
const OP = db.Sequelize.Op;

// LOGIN ------------------------------------
let moduloLogin = require('../modulo-login'); 

// ENCRIPTACIÓN DE PASS ----------------------------------------

const bcrypt = require('bcryptjs');
let passEncriptada = bcrypt.hashSync('root', 10);    

// ----------------------------------------- FIN DE ENCRIPTACIÓN


module.exports = {

    id_serie: (req, res) => {
        let id_serie = req.query.id
        //return res.send(id_serie)
        res.render('descripcion', {
            id_serie: id_serie
        })
    },


    guarda_resena: (req, res) => {
        //return res.send(req.body)
            moduloLogin.chequearUsuario(req.body.email)
                .then(resultado => {
                    moduloLogin.validar(req.body.email)
                    .then(resultado=>{
                            if(resultado  == null ){
                                console.log("El E-mail NO esta en la base de datos");
                            } else{
                                if (bcrypt.compareSync(req.body.contraseña, resultado.contraseña)) {

                                    db.Resena.create({
                                        id_usuario:resultado.id_usuario,
                                        id_serie: req.body.id_serie,
                                        texto_resena: req.body.texto_resena,
                                        puntaje_serie: req.body.puntaje_serie
                                    })
                                    .then(resenaGuardada =>{
                                        console.log(resenaGuardada)     
                                        return res.send(resenaGuardada)  
                         
                                    })
                                    .catch(error => {
                                        return res.send (error);
                                    })

                                } else {  
                                    console.log("Te equivocaste BRO"); 
                                    res.send("Falló la validación")                   
                                }
                            }
                    })             
                })

    },

    //////////////////////////////   LISTADO DE RESEÑAS //////////////////////////////

    listado: function(req, res) {
        let filter = {};
        let r = req.body.texto_resena;

        if (r){
            filter = {
                where: [ {
                    resenas: {[OP.like]: "%" + req.body.texto_resena +  "%"}
                } ]
            };
        } 

        db.Resena.findAll(filter,{
            include: [{association: "usuario"}]
        })
                .then((resenas) => {
                    if(resenas != "") {
                        //res.json(usuarios)
                        res.render('descripcion', {
                            resenas: resenas
                        })
                    } else {
                        //res.send("No encuentro")
                        res.send('Not found')
                    }
                    // console.log(resenas)
                   
                })
    },


    //////////////////////////////   MIS RESEÑAS //////////////////////////////

    validar: (req, res) => { 
        moduloLogin.chequearUsuario(req.body.email)
            .then(resultado => {
                moduloLogin.validar(req.body.email, {
                    include: [{association: "resenas"}]
                } )
                .then(resultado => {
                        console.log(resultado); 
                        if (resultado  == null){
                            res.send("El E-mail NO esta en la base de datos")
                            console.log("El E-mail NO esta en la base de datos");
                        }else { 
                            if (bcrypt.compareSync(req.body.contraseña, resultado.contraseña)) {
                                // console.log("JOYA");
                                //res.render("resenas")        
                                res.redirect('/series/resenas/' + resultado.id_usuario)
                            } else {  
                                console.log("Te equivocaste BRO"); 
                                res.send("Falló la validación")  
                            
                        }
                        }
                    })
                
            })
            .catch(error => {
                return res.send (error);
            })
    },

    user: (req, res) =>{
        db.Usuario.findByPk(req.params.id_usuario,{
            include: [{association: "resenas"}]
        })
        .then(unUser => {
               // res.json(unUser)
                res.render("resenas", {unUser:unUser})
        })
        .catch(error => {
            return res.send (error);
        })
    },

    //////////////////////////////   Editar  //////////////////////////////
    
    editar: function(req, res){
        db.Usuario.findAll()
        .then((editar) => {

            db.Resena.findByPk(req.params.id)
            .then((editar) => {
                res.render("editarSerie", {
                    editar: editar,
                })
            })

        })
    },

    actualizar: function(req, res) {
        let resena = {
            texto_resena: req.body.texto_resena,
            puntaje_serie: req.body.puntaje_serie
        }

        db.Resena.update(resena, {
            where: {
                id_resena: req.params.id
            }
        })
        .then((resultado) => {
            res.redirect('/series/resenas/')
        })
    },

    porEliminar: function(req, res){
        db.Usuario.findAll()
        .then((borrar) => {

            db.Resena.findByPk(req.params.id)
            .then((borrar) => {
                res.render("borrarSerie", {
                    borrar: borrar,
                })
            })

        })
    },

    delete: function(req,res) {
        db.Resena.destroy({
            where: {
                id_resena: req.params.id
            }
        })
        .then((resultado) => {
            res.redirect('/series/resenas/')
        })
    }
};


