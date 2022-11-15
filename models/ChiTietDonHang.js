const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChiTietDonHang', {
    MonID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Mon',
        key: 'MonID'
      }
    },
    DonHangID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'DonHang',
        key: 'DonHangID'
      }
    },
    SoLuong: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    GiaBan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    GhiChuTuyChon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DanhGia: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ChiTietDonHang',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkChiTietDonHang",
        unique: true,
        fields: [
          { name: "MonID" },
          { name: "DonHangID" },
        ]
      },
    ]
  });
};
