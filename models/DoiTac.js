const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DoiTac', {
    DoiTacID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    NguoiDaiDien: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SoLuongQuan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SoLuongDonDuKien: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DiaChiKinhDoanh: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SoDienThoai: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    TrangThai: {
      type: DataTypes.STRING(20),
      allowNull: true
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
    tableName: 'DoiTac',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkDoiTac",
        unique: true,
        fields: [
          { name: "DoiTacID" },
        ]
      },
    ]
  });
};
