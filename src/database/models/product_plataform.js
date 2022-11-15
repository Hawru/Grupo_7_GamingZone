const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_plataform', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    plataform_type_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'plataforms',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_plataform',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_product_plataform_1_idx",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_product_plataform_2_idx",
        using: "BTREE",
        fields: [
          { name: "plataform_type_id" },
        ]
      },
      {
        name: "UQ_product_plataform_1",
        using: "BTREE",
        fields: [
          { name: "product_id" },
          { name: "plataform_type_id" },
        ]
      },
    ]
  });
};
