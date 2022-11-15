const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TaiKhoan', {
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    MatKhau: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TrangThai: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TaiKhoan',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkTaiKhoan",
        unique: true,
        fields: [
          { name: "Username" },
        ]
      },
    ]
  });
};
