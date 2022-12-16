use ESHOPPING_CSDLNC;
go
create or alter proc XemThucDonDoiTac (@DoiTacID char(50))
as BEGIN TRANSACTION
begin try
SELECT distinct td.* 
FROM HopDong hd JOIN ChiNhanh cn ON hd.HopDongID = cn.HopDongID JOIN ThucDon td ON td.ThucDonID = cn.ThucDonID 
WHERE hd.DoiTacID = @DoiTacID;
commit;
end try
		begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch
go 

create or alter proc InsertThucDon @TenThucDon nvarchar(70)
as BEGIN TRANSACTION
begin try
INSERT INTO ThucDon(TenThucDon) VALUES (@TenThucDon);
commit;
end try
		begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;
go

create or alter proc XoaThucDon @ThucDonID char(50)
as BEGIN TRANSACTION begin try
delete from thucdon where thucdonid = @ThucDonID;
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;

go

create or alter proc ThemMon @TenMon nvarchar(30),
							@MieuTaMon nvarchar(100),
							@Gia float,
							@TinhTrang nvarchar(30),
							@ThucDonID int
as BEGIN TRANSACTION
begin try
INSERT INTO MON(tenmon, mieutamon, gia, tinhtrang, thucdonid) VALUES (@TenMon , @MieuTaMon, @Gia, @TinhTrang, @ThucDonID);
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;

go

create or alter proc XoaMon @MonID char(50)
as BEGIN TRANSACTION begin try
delete from Mon where monid = @MonID;
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;

go

create or alter proc ChinhSuaMon @MonID char(50),
								 @TenMon nvarchar(30) = NULL,
								@MieuTaMon nvarchar(100) = NULL,
								@Gia float = NULL,
								@TinhTrang nvarchar(30) = NULL
as BEGIN TRANSACTION
begin try
Update Mon 
SET TenMon = IsNUll(@TenMon, TenMon), 
	MieuTaMon = IsNull(@MieuTaMon, MieuTaMon),
	Gia = IsNull(@Gia, Gia),
	TinhTrang = IsNull(@TinhTrang, tinhtrang) 
WHERE MonID = @MonID
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;

go
--Xem ??n ??t hàng
create or alter proc CheckDonDathangDoitac @DoiTacID char(50)
as BEGIN TRANSACTION begin try 
SELECT dh.* 
FROM DonHang dh JOIN ChiTietDonHang ctdh ON dh.DonhangID = ctdh.DonhangID JOIN Mon m ON m.MonID = ctdh.MonID 
WHERE EXISTS (SELECT cn.ThucDonID FROM ChiNhanh cn JOIN HopDong hd ON cn.HopDongID = hd.HopDongID WHERE hd.DoiTacID = @DoiTacID 
AND m.ThucDonID = cn.ThucDonID);
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction;
			return 0
		end catch;
go

create or alter proc CapNhatTinhtrangDonhang @DonhangID int, @TinhTrang nvarchar(20)
as BEGIN TRANSACTION begin try
UPDATE DonHang SET TrangThai = @TinhTrang WHERE DonHangID = @DonhangID; 
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;

go

-- xem c?a hàng c?a mình
create or alter proc ListCuahangDoiTac @DoiTacID char(50)
as BEGIN TRANSACTION begin try
select cn.* from chinhanh cn join hopdong hd on cn.HopDongID = hd.HopDongID where hd.DoiTacID = @DoitacID;
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;
go

-- ch?nh s?a thông tin chi nhánh
create or alter proc UpdateChiNhanhInfo @ChiNhanhID char(50),
									@tenChiNhanh nvarchar(60) = null,
									@DiaChi nvarchar(100) = null,
									@GioMoCua time = null,
									@GioDongCua time = null,
									@TinhTrang nvarchar(20) = null
as BEGIN TRANSACTION
begin try
Update ChiNhanh SET
	TenChiNhanh = IsNull( @tenchinhanh, TenChiNhanh),
	DiaChi = IsNull( @DiaChi, DiaChi),
	MoCua = IsNull( @GioMoCua, MoCua),
	DongCua = IsNull( @GioDongCua, DongCua),
	TinhTrang = IsNull( @TinhTrang, TinhTrang)
WHERE ChiNhanhID = @ChiNhanhID;
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;
go

-- th?ng kê ??n hàng theo ngày, tu?n , tháng
create or alter proc ThongKeDonhangTheoNgay
as BEGIN TRANSACTION
begin try
select dh.NgayDatHang, count(1) from donhang dh group by dh.NgayDatHang;
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;
go
create or alter proc ThongKeDonhangTheoThang
as BEGIN TRANSACTION
begin try
select Month(dh.NgayDatHang), YEAR(dh.NgayDatHang) , count(1) from donhang dh group by Month(dh.NgayDatHang), YEAR(dh.NgayDatHang);
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;

go
create or alter proc ThongKeDonhangTheoNam
as BEGIN TRANSACTION
begin try
select YEAR(dh.NgayDatHang) , count(1) from donhang dh group by dh.NgayDatHang, YEAR(dh.NgayDatHang);
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;
go

--th?ng kê doanh thu theo ngày, tháng, n?m
create or alter proc ThongKeDoanhThuTheoNgay
as BEGIN TRANSACTION
begin try
Select dh.NgayDatHang, sum(ct.GiaBan * ct.SoLuong) from donhang dh join chitietdonhang ct on dh.DonhangID = ct.DonhangID group by dh.NgayDatHang;
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;
go
create or alter proc ThongKeDoanhThuTheoThang
as BEGIN TRANSACTION
begin try
Select Month(dh.NgayDatHang),Year(dh.NgayDatHang), sum(ct.GiaBan * ct.SoLuong) 
from donhang dh join chitietdonhang ct on dh.DonhangID = ct.DonhangID group by Month(dh.NgayDatHang), Year(dh.NgayDatHang);
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;
go
create or alter proc ThongKeDoanhThuTheoNam
as BEGIN TRANSACTION
begin try
Select Year(dh.NgayDatHang), sum(ct.GiaBan * ct.SoLuong) from donhang dh join chitietdonhang ct on dh.DonhangID = ct.DonhangID 
group by YEAR(dh.NgayDatHang);
commit;
end try
begin catch
			print N'Đã xảy ra lỗi!'
			rollback transaction
			return 0
		end catch;
go
