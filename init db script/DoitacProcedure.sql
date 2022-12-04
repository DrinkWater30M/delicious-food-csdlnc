use QLNhaHang
go
create or alter proc XemThucDonDoiTac (@DoiTacID int)
as 
begin try
SELECT distinct td.* 
FROM HopDong hd JOIN ChiNhanh cn ON hd.HopDongID = cn.HopDongID JOIN ThucDon td ON td.ThucDonID = cn.ThucDonID 
WHERE hd.DoiTacID = @DoiTacID;
end try
		begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch
go 

create or alter proc InsertThucDon @TenThucDon nvarchar(70)
as 
begin try
INSERT INTO ThucDon(TenThucDon) VALUES (@TenThucDon)
end try
		begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;
go

create or alter proc XoaThucDon @ThucDonID int
as begin try
delete from thucdon where thucdonid = @ThucDonID;
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;

go

create or alter proc ThemMon @TenMon nvarchar(30),
							@MieuTaMon nvarchar(100),
							@Gia float,
							@TinhTrang nvarchar(30),
							@ThucDonID int
as
begin try
INSERT INTO MON(tenmon, mieutamon, gia, tinhtrang, thucdonid) VALUES (@TenMon , @MieuTaMon, @Gia, @TinhTrang, @ThucDonID);
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;

go

create or alter proc XoaMon @MonID int
as begin try
delete from Mon where monid = @MonID;
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;

go

create or alter proc ChinhSuaMon @MonID int,
								 @TenMon nvarchar(30) = NULL,
								@MieuTaMon nvarchar(100) = NULL,
								@Gia float = NULL,
								@TinhTrang nvarchar(30) = NULL
as 
begin try
Update Mon 
SET TenMon = IsNUll(@TenMon, TenMon), 
	MieuTaMon = IsNull(@MieuTaMon, MieuTaMon),
	Gia = IsNull(@Gia, Gia),
	TinhTrang = IsNull(@TinhTrang, tinhtrang) 
WHERE MonID = @MonID
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;

go
--Xem ??n ??t hàng
create or alter proc CheckDonDathangDoitac @DoiTacID int
as begin try 
SELECT DISTINCT dh.* 
FROM DonHang dh JOIN ChiTietDonHang ctdh ON dh.DonhangID = ctdh.DonhangID JOIN Mon m ON m.MonID = ctdh.MonID 
WHERE EXISTS (SELECT cn.ThucDonID FROM ChiNhanh cn JOIN HopDong hd ON cn.HopDongID = hd.HopDongID WHERE hd.DoiTacID = @DoiTacID 
AND m.ThucDonID = cn.ThucDonID)
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;
go

create or alter proc CapNhatTinhtrangDonhang @DonhangID int, @TinhTrang nvarchar(20)
as begin try
UPDATE DonHang SET TrangThai = @TinhTrang WHERE DonHangID = @DonhangID; 
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;

go

-- xem c?a hàng c?a mình
create or alter proc ListCuahangDoiTac @DoiTacID int
as begin try
select cn.* from chinhanh cn join hopdong hd on cn.HopDongID = hd.HopDongID where hd.DoiTacID = @DoitacID;
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;
go

-- ch?nh s?a thông tin chi nhánh
create or alter proc UpdateChiNhanhInfo @ChiNhanhID int,
									@tenChiNhanh nvarchar(60) = null,
									@DiaChi nvarchar(100) = null,
									@GioMoCua time = null,
									@GioDongCua time = null,
									@TinhTrang nvarchar(20) = null
as 
begin try
Update ChiNhanh SET
	TenChiNhanh = IsNull( @tenchinhanh, TenChiNhanh),
	DiaChi = IsNull( @DiaChi, DiaChi),
	GioMoCua = IsNull( @GioMoCua, GioMoCua),
	GioDongCua = IsNull( @GioDongCua, GioDongCua),
	TinhTrang = IsNull( @TinhTrang, TinhTrang)
WHERE ChiNhanhID = @ChiNhanhID
if @tenChiNhanh is not null
	update chinhanh set NgayCapNhatTen = (Select SYSDATETIME()) where ChiNhanhID = @ChiNhanhID;
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;
go

-- th?ng kê ??n hàng theo ngày, tu?n , tháng
create or alter proc ThongKeDonhangTheoNgay
as
begin try
select dh.NgayDat, count(1) from donhang dh group by dh.NgayDat;
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;
go
create or alter proc ThongKeDonhangTheoThang
as
begin try
select Month(dh.NgayDat), YEAR(dh.NgayDat) , count(1) from donhang dh group by dh.NgayDat, Month(dh.NgayDat), YEAR(dh.NgayDat);
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;

go
create or alter proc ThongKeDonhangTheoNam
as
begin try
select YEAR(dh.NgayDat) , count(1) from donhang dh group by dh.NgayDat, YEAR(dh.NgayDat);
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;
go

--th?ng kê doanh thu theo ngày, tháng, n?m
create or alter proc ThongKeDoanhThuTheoNgay
as
begin try
Select dh.NgayDat, sum(ct.GiaBan * ct.SoLuong) from donhang dh join chitietdonhang ct on dh.DonhangID = ct.DonhangID group by dh.NgayDat;
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;
go
create or alter proc ThongKeDoanhThuTheoThang
as
begin try
Select Month(dh.NgayDat),Year(dh.NgayDat), sum(ct.GiaBan * ct.SoLuong) 
from donhang dh join chitietdonhang ct on dh.DonhangID = ct.DonhangID group by Month(dh.NgayDat), Year(dh.NgayDat);
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;
go
create or alter proc ThongKeDoanhThuTheoNam
as
begin try
Select Year(dh.NgayDat), sum(ct.GiaBan * ct.SoLuong) from donhang dh join chitietdonhang ct on dh.DonhangID = ct.DonhangID 
group by YEAR(dh.NgayDat);
end try
begin catch
			print N'?ã x?y ra l?i!'
			rollback transaction
			return 0
		end catch;
go