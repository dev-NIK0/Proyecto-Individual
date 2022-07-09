const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('genre', {
    ID: {
      allowNull: false, 
      primaryKey: true, 
      type: DataTypes.UUID, // El tipo de dato UUID seria un identificador Unico Global, es una secuencia de digitos hexadecimales.
      defaultValue: DataTypes.UUIDV4 
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};