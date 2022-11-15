const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_score', {
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
    score_type_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'score_types',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_score',
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
        name: "UQ_product_score_1",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
          { name: "score_type_id" },
        ]
      },
      {
        name: "fk_product_score_1_idx",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_product_score_2_idx",
        using: "BTREE",
        fields: [
          { name: "score_type_id" },
        ]
      },
    ]
  });
};
