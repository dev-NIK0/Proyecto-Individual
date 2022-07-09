const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    ID: {
      allowNull: false, 
      primaryKey: true, 
      type: DataTypes.UUID, // El tipo de dato UUID seria un identificador Unico Global, es una secuencia de digitos hexadecimales.
      defaultValue: DataTypes.UUIDV4 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    rating: {
      type: DataTypes.FLOAT
    },
    released: {
      type: DataTypes.STRING
    },
    createdDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    img: {
      type: DataTypes.TEXT
    },
  });
};
