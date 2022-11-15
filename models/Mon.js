const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Mon', {
    MonID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    TenMon: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MieuTaMon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Gia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TinhTrang: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ThucDonID: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'ThucDon',
        key: 'ThucDonID'
      }
    }
  }, {
    sequelize,
    tableName: 'Mon',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkMon",
        unique: true,
        fields: [
          { name: "MonID" },
        ]
      },
    ]
  });
};
