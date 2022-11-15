const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NhanVien', {
    NhanVienID: {
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
    tableName: 'NhanVien',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkNhanVien",
        unique: true,
        fields: [
          { name: "NhanVienID" },
        ]
      },
    ]
  });
};
