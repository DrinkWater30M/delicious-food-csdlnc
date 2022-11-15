const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('KhachHang', {
    KhachHangID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    HoTen: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SoDienThoai: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    DiaChi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TKNganHangID: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'TaiKhoanNganHang',
        key: 'TKNganHangID'
      }
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
    tableName: 'KhachHang',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkKhachHang",
        unique: true,
        fields: [
          { name: "KhachHangID" },
        ]
      },
    ]
  });
};
