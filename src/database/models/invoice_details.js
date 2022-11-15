const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoice_details', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    sale_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'sales',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    invoice_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'invoices',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'invoice_details',
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
        name: "fk_invoice_details_1_idx",
        using: "BTREE",
        fields: [
          { name: "sale_id" },
        ]
      },
      {
        name: "fk_invoice_details_2_idx",
        using: "BTREE",
        fields: [
          { name: "invoice_id" },
        ]
      },
    ]
  });
};
