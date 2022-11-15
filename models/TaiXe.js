const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TaiXe', {
    TaiXeID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    HoTen: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CMND: {
      type: DataTypes.STRING(20),
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
    BienSoXe: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    KhuVucHoatDong: {
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
    tableName: 'TaiXe',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkTaiXe",
        unique: true,
        fields: [
          { name: "TaiXeID" },
        ]
      },
    ]
  });
};
