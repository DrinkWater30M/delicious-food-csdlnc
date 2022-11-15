var DataTypes = require("sequelize").DataTypes;
var _ChiNhanh = require("./ChiNhanh");
var _ChiTietDonHang = require("./ChiTietDonHang");
var _DoiTac = require("./DoiTac");
var _DonHang = require("./DonHang");
var _HopDong = require("./HopDong");
var _KhachHang = require("./KhachHang");
var _Mon = require("./Mon");
var _NhanVien = require("./NhanVien");
var _Quan = require("./Quan");
var _QuanTri = require("./QuanTri");
var _TaiKhoan = require("./TaiKhoan");
var _TaiKhoanNganHang = require("./TaiKhoanNganHang");
var _TaiXe = require("./TaiXe");
var _ThucDon = require("./ThucDon");

function initModels(sequelize) {
  var ChiNhanh = _ChiNhanh(sequelize, DataTypes);
  var ChiTietDonHang = _ChiTietDonHang(sequelize, DataTypes);
  var DoiTac = _DoiTac(sequelize, DataTypes);
  var DonHang = _DonHang(sequelize, DataTypes);
  var HopDong = _HopDong(sequelize, DataTypes);
  var KhachHang = _KhachHang(sequelize, DataTypes);
  var Mon = _Mon(sequelize, DataTypes);
  var NhanVien = _NhanVien(sequelize, DataTypes);
  var Quan = _Quan(sequelize, DataTypes);
  var QuanTri = _QuanTri(sequelize, DataTypes);
  var TaiKhoan = _TaiKhoan(sequelize, DataTypes);
  var TaiKhoanNganHang = _TaiKhoanNganHang(sequelize, DataTypes);
  var TaiXe = _TaiXe(sequelize, DataTypes);
  var ThucDon = _ThucDon(sequelize, DataTypes);

  DonHang.belongsToMany(Mon, { as: 'MonID_Mons', through: ChiTietDonHang, foreignKey: "DonHangID", otherKey: "MonID" });
  Mon.belongsToMany(DonHang, { as: 'DonHangID_DonHangs', through: ChiTietDonHang, foreignKey: "MonID", otherKey: "DonHangID" });
  HopDong.belongsTo(DoiTac, { as: "DoiTac", foreignKey: "DoiTacID"});
  DoiTac.hasMany(HopDong, { as: "HopDongs", foreignKey: "DoiTacID"});
  Quan.belongsTo(DoiTac, { as: "DoiTac", foreignKey: "DoiTacID"});
  DoiTac.hasMany(Quan, { as: "Quans", foreignKey: "DoiTacID"});
  ChiTietDonHang.belongsTo(DonHang, { as: "DonHang", foreignKey: "DonHangID"});
  DonHang.hasMany(ChiTietDonHang, { as: "ChiTietDonHangs", foreignKey: "DonHangID"});
  ChiNhanh.belongsTo(HopDong, { as: "HopDong", foreignKey: "HopDongID"});
  HopDong.hasMany(ChiNhanh, { as: "ChiNhanhs", foreignKey: "HopDongID"});
  DonHang.belongsTo(KhachHang, { as: "KhachHang", foreignKey: "KhachHangID"});
  KhachHang.hasMany(DonHang, { as: "DonHangs", foreignKey: "KhachHangID"});
  ChiTietDonHang.belongsTo(Mon, { as: "Mon", foreignKey: "MonID"});
  Mon.hasMany(ChiTietDonHang, { as: "ChiTietDonHangs", foreignKey: "MonID"});
  HopDong.belongsTo(NhanVien, { as: "NhanVienLap_NhanVien", foreignKey: "NhanVienLap"});
  NhanVien.hasMany(HopDong, { as: "HopDongs", foreignKey: "NhanVienLap"});
  DoiTac.belongsTo(TaiKhoan, { as: "Username_TaiKhoan", foreignKey: "Username"});
  TaiKhoan.hasMany(DoiTac, { as: "DoiTacs", foreignKey: "Username"});
  KhachHang.belongsTo(TaiKhoan, { as: "Username_TaiKhoan", foreignKey: "Username"});
  TaiKhoan.hasMany(KhachHang, { as: "KhachHangs", foreignKey: "Username"});
  NhanVien.belongsTo(TaiKhoan, { as: "Username_TaiKhoan", foreignKey: "Username"});
  TaiKhoan.hasMany(NhanVien, { as: "NhanViens", foreignKey: "Username"});
  QuanTri.belongsTo(TaiKhoan, { as: "Username_TaiKhoan", foreignKey: "Username"});
  TaiKhoan.hasMany(QuanTri, { as: "QuanTris", foreignKey: "Username"});
  TaiXe.belongsTo(TaiKhoan, { as: "Username_TaiKhoan", foreignKey: "Username"});
  TaiKhoan.hasMany(TaiXe, { as: "TaiXes", foreignKey: "Username"});
  HopDong.belongsTo(TaiKhoanNganHang, { as: "TKNganHang", foreignKey: "TKNganHangID"});
  TaiKhoanNganHang.hasMany(HopDong, { as: "HopDongs", foreignKey: "TKNganHangID"});
  KhachHang.belongsTo(TaiKhoanNganHang, { as: "TKNganHang", foreignKey: "TKNganHangID"});
  TaiKhoanNganHang.hasMany(KhachHang, { as: "KhachHangs", foreignKey: "TKNganHangID"});
  TaiXe.belongsTo(TaiKhoanNganHang, { as: "TKNganHang", foreignKey: "TKNganHangID"});
  TaiKhoanNganHang.hasMany(TaiXe, { as: "TaiXes", foreignKey: "TKNganHangID"});
  DonHang.belongsTo(TaiXe, { as: "TaiXe", foreignKey: "TaiXeID"});
  TaiXe.hasMany(DonHang, { as: "DonHangs", foreignKey: "TaiXeID"});
  ChiNhanh.belongsTo(ThucDon, { as: "ThucDon", foreignKey: "ThucDonID"});
  ThucDon.hasMany(ChiNhanh, { as: "ChiNhanhs", foreignKey: "ThucDonID"});
  Mon.belongsTo(ThucDon, { as: "ThucDon", foreignKey: "ThucDonID"});
  ThucDon.hasMany(Mon, { as: "Mons", foreignKey: "ThucDonID"});

  return {
    ChiNhanh,
    ChiTietDonHang,
    DoiTac,
    DonHang,
    HopDong,
    KhachHang,
    Mon,
    NhanVien,
    Quan,
    QuanTri,
    TaiKhoan,
    TaiKhoanNganHang,
    TaiXe,
    ThucDon,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
