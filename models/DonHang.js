const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DonHang', {
    DonHangID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    NguoiNhan: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SoDienThoai: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    DiaChiNhanHang: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    NgayDatHang: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    PhiSanPham: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PhiVanChuyen: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TrangThai: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    KhachHangID: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'KhachHang',
        key: 'KhachHangID'
      }
    },
    TaiXeID: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'TaiXe',
        key: 'TaiXeID'
      }
    }
  }, {
    sequelize,
    tableName: 'DonHang',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkDonHang",
        unique: true,
        fields: [
          { name: "DonHangID" },
        ]
      },
    ]
  });
};
