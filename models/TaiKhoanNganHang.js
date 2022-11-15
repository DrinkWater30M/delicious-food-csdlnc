const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TaiKhoanNganHang', {
    TKNganHangID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    SoTaiKhoan: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    NganHang: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ChiNhanh: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TaiKhoanNganHang',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkTaiKhoanNganHang",
        unique: true,
        fields: [
          { name: "TKNganHangID" },
        ]
      },
    ]
  });
};
