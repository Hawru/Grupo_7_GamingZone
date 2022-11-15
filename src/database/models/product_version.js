const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_version', {
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
    version_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'version_types',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_version',
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
        name: "UQ_product_version_1",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
          { name: "version_id" },
        ]
      },
      {
        name: "fk_product_version_1_idx",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_product_version_2_idx",
        using: "BTREE",
        fields: [
          { name: "version_id" },
        ]
      },
    ]
  });
};
