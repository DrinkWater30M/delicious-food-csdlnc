const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChiNhanh', {
    ChiNhanhID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    TenChiNhanh: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DiaChi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    MoCua: {
      type: DataTypes.TIME,
      allowNull: true
    },
    DongCua: {
      type: DataTypes.TIME,
      allowNull: true
    },
    QuanID: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    HopDongID: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'HopDong',
        key: 'HopDongID'
      }
    },
    ThucDonID: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'ThucDon',
        key: 'ThucDonID'
      }
    },
    TinhTrang: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ChiNhanh',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkChiNhanh",
        unique: true,
        fields: [
          { name: "ChiNhanhID" },
        ]
      },
    ]
  });
};
