module.exports = function (sequelize, dataTypes) {

  let alias = "Resena";

  let cols = {
      id_resena: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_serie: {
        type: dataTypes.INTEGER
      },
      id_usuario: {
        type: dataTypes.INTEGER
      },
      texto_resena:{
        type: dataTypes.STRING,
      }, 
      fecha_creacion: {
        type: dataTypes.DATE
      },
      fecha_actualizacion: {
        type: dataTypes.DATE
      },
      puntaje_serie: {
        type: dataTypes.DECIMAL,
      }

  }

  let config = {
      tableName: "resenas",
      timestamps: false
  }

  let Resena = sequelize.define(alias, cols, config);

  // En este punto, lo que buscamos hacer es la relación entre las tablas
  Resena.associate = function(models) {
    Resena.belongsTo(models.Usuario, { // .Usuario: Es el nombre del alias del modelo Usuario.js
        as: 'usuario',  
        foreignKey: 'id_usuario',
        otherKey: 'id_serie', 
    });
}

  return Resena;
}