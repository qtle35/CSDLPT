package com.example.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DAO {
	private String url = "jdbc:sqlserver://LAPTOP-QJLQUF64;databaseName=CSDLPT;encrypt=true;trustServerCertificate=true";
	private String username = "sa";
	private String password = "123";
	private static final String VeBan = "SELECT NV.MaNV, NV.TenNV, COUNT(Ve.MaV) AS SLVe\r\n"
			+ "FROM (SELECT NhanVien.MaNV, NhanVien.TenNV FROM NhanVien) AS NV\r\n"
			+ "	INNER JOIN (SELECT Ve.MaV, Ve.MaNV FROM Ve WHERE Ve.GiaVe > 2000000) AS Ve\r\n"
			+ "	ON Ve.MaNV = NV.MaNV\r\n"
			+ "GROUP BY NV.MaNV, NV.TenNV\r\n"
			+ "UNION\r\n"
			+ "SELECT NVQN.MaNV, NVQN.TenNV, COUNT(VeQN.MaV) AS SLVe\r\n"
			+ "FROM (SELECT QNNV.MaNV, QNNV.TenNV FROM QuangNinh.CSDLPT.dbo.NhanVien AS QNNV) AS NVQN\r\n"
			+ "	INNER JOIN (SELECT QNVE.MaNV, QNVE.MaV FROM QuangNinh.CSDLPT.dbo.Ve AS QNVE WHERE GiaVe > 2000000) AS VeQN \r\n"
			+ "	ON NVQN.MaNV = VeQN.MaNV\r\n"
			+ "GROUP BY NVQN.MaNV, NVQN.TenNV\r\n"
			+ "ORDER BY SLVe;";
	private static final String ChuyenBayValue = "SELECT CB.MaCB,MB.TenMB, CB.SanBayXuatPhat, CBHN.SanBayDich\r\n"
			+ "FROM  (ChuyenBay AS CB\r\n"
			+ "		INNER JOIN HANOI.CSDLPT.dbo.ChuyenBay as CBHN\r\n"
			+ "		ON CB.MaCB = CBHN.MaCB),\r\n"
			+ "		(SELECT maSB FROM SanBay WHERE SanBay.TenSB = ?) AS SB, \r\n"
			+ "		(SELECT TenMB, MaMB FROM MayBay) AS MB\r\n"
			+ "WHERE CB.SanBayXuatPhat = SB.maSB and MB.maMB = CB.maMB";
	
	private static final String tenSB = "SELECT MaSB, TenSB FROM SanBay";
	private static final String Ve = "INSERT INTO Ve(MaV, MaKH, MaCB, MaNV, GiaVe) values\r\n"
			+ "(?,?,?,?,?)";
	private static final String MaNV = "SELECT MaNV FROM NhanVien";
	private static final String MaKH = "SELECT MaKH FROM KhachHang";
	private static final String MaCB = "SELECT MaCB FROM ChuyenBay";
	private static final String ALLVE = "SELECT MaV, MaKH, MaCB, MaNV, GiaVe FROM Ve";
	protected Connection getconConnection() {
		Connection connection = null;
		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			connection = DriverManager.getConnection(url, username, password);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch(SQLException e) {
			e.printStackTrace();
		}
		return connection;
	}
	public List<VeBan> getAllVeBan() {
		List<VeBan> lvb = new ArrayList<>();
		try {
			Connection connection = getconConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(VeBan);
			
			ResultSet resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				lvb.add(new VeBan(resultSet.getString("MaNV"), resultSet.getString("TenNV"), resultSet.getString("SLVe")));
			}
		} catch(SQLException e) {
			e.printStackTrace();
		}
		return lvb;
	}
	public List<Ve> getAllVe() {
		List<Ve> lv = new ArrayList<>();
		try {
			Connection connection = getconConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(ALLVE);
			
			ResultSet resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				lv.add(new Ve(resultSet.getString("MaV"),resultSet.getString("MaKH"),resultSet.getString("MaCB"),resultSet.getString("MaNV"), resultSet.getInt("GiaVe")));
			}
		} catch(SQLException e) {
			e.printStackTrace();
		}
		return lv;
	}
	public List<ChuyenBayValue> getByValueChuyenBay(String s) {
		List<ChuyenBayValue> lcb = new ArrayList<>();
		try {
			Connection connection = getconConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(ChuyenBayValue);
			preparedStatement.setNString(1, s);
			ResultSet resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				lcb.add(new ChuyenBayValue(resultSet.getString("MaCB"), resultSet.getString("TenMB"), resultSet.getString("SanBayXuatPhat"),
						resultSet.getString("SanBayDich")));
			}
		} catch(SQLException e) {
			e.printStackTrace();
		}
		return lcb;
	}
	public List<SanBay> getAllTenSB() {
		List<SanBay> ltsb = new ArrayList<>();
		try {
			Connection connection = getconConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(tenSB);
			ResultSet resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				ltsb.add(new SanBay(resultSet.getString("MaSB") ,resultSet.getString("TenSB")));
			}
		} catch(SQLException e) {
			e.printStackTrace();
		}
		return ltsb;
	}
	public void addVe(Ve ve) throws SQLException {
	    try (Connection connection = getconConnection();
	         PreparedStatement preparedStatement = connection.prepareStatement(Ve)) {
	        preparedStatement.setString(1, ve.getMaV());
	        preparedStatement.setString(2, ve.getMaKH());
	        preparedStatement.setString(3, ve.getMaCB());
	        preparedStatement.setString(4, ve.getMaNV());
	        preparedStatement.setInt(5, ve.getGiaVe());
	        preparedStatement.executeUpdate();
	    } catch (SQLException e) {
	        throw new SQLException("Lỗi SQL khi thêm vé: " + e.getMessage());
	    }
	}

	public List<String> getAllMaNV(){
		List<String> lmnv = new ArrayList<>();
		try {
			Connection connection = getconConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(MaNV);
			ResultSet resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				lmnv.add(resultSet.getString("MaNV"));
			}
		} catch(SQLException e) {
			e.printStackTrace();
		}
		return lmnv;
	}
	public List<String> getAllMaCB(){
		List<String> lmcb = new ArrayList<>();
		try {
			Connection connection = getconConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(MaCB);
			ResultSet resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				lmcb.add(resultSet.getString("MaCB"));
			}
		} catch(SQLException e) {
			e.printStackTrace();
		}
		return lmcb;
	}
	public List<String> getAllMaKH(){
		List<String> lmkh = new ArrayList<>();
		try {
			Connection connection = getconConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(MaKH);
			ResultSet resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				lmkh.add(resultSet.getString("MaKH"));
			}
		} catch(SQLException e) {
			e.printStackTrace();
		}
		return lmkh;
	}
}
