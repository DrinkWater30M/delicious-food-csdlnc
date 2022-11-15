const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HopDong', {
    HopDongID: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    MaSoThue: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    NguoiDaiDien: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SoChiNhanh: {
      type: DataTypes.INTEGER,
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
    NgayKichHoat: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    NgayHetHan: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    TrangThai: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    NhanVienLap: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'NhanVien',
        key: 'NhanVienID'
      }
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
    tableName: 'HopDong',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "pkHopDong",
        unique: true,
        fields: [
          { name: "HopDongID" },
        ]
      },
    ]
  });
};
