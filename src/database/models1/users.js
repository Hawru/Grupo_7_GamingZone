const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    profile_image_path: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    user_type_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'user_types',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "fk_users_1_idx",
        using: "BTREE",
        fields: [
          { name: "user_type_id" },
        ]
      },
    ]
  });
};
