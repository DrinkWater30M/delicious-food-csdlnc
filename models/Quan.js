const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quan', {
    QuanID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    TenQuan: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    LoaiAmThuc: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    NgayDangKi: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    TinhTrang: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    DoiTacID: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'DoiTac',
        key: 'DoiTacID'
      }
    }
  }, {
    sequelize,
    tableName: 'Quan',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkQuan",
        unique: true,
        fields: [
          { name: "QuanID" },
        ]
      },
    ]
  });
};
