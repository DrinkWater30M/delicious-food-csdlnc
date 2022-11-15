const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('QuanTri', {
    AdminID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    HoTen: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SoDienThoai: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'TaiKhoan',
        key: 'Username'
      }
    }
  }, {
    sequelize,
    tableName: 'QuanTri',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkQuanTri",
        unique: true,
        fields: [
          { name: "AdminID" },
        ]
      },
    ]
  });
};
