const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ThucDon', {
    ThucDonID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    TenThucDon: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ThucDon',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkThucDon",
        unique: true,
        fields: [
          { name: "ThucDonID" },
        ]
      },
    ]
  });
};
