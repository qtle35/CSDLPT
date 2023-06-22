package com.example.demo;

import java.sql.SQLException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class Controller {
	@GetMapping("/dsve")
	public List<Ve> getAllVe(){
		DAO dao = new DAO();
		return dao.getAllVe();
	}
	@GetMapping("/dstensb")
	public List<SanBay> getAllTenSB(){
		DAO dao = new DAO();
		return dao.getAllTenSB();
	}
	@GetMapping("/dsveban")
	public List<VeBan> getAllVeBan(){
		DAO dao = new DAO();
		return dao.getAllVeBan();
	}
	@PostMapping("/dscbvalue")
	public List<ChuyenBayValue> getAllCBValue(@RequestBody SanBay sanbay){
//		System.out.println(sanbay.toString());
		DAO dao = new DAO();
		return dao.getByValueChuyenBay(sanbay.getTenSB());
	}
	@GetMapping("/dsmanv")
	public List<String> getAllMaNV(){
		DAO dao = new DAO();
		return dao.getAllMaNV();
	}
	@GetMapping("/dsmacb")
	public List<String> getAllMaCB(){
		DAO dao = new DAO();
		return dao.getAllMaCB();
	}
	@GetMapping("/dsmakh")
	public List<String> getAllMaKH(){
		DAO dao = new DAO();
		return dao.getAllMaKH();
	}
	@PostMapping("/addve")
	public ResponseEntity<String> addVe(@RequestBody Ve ve) {
//		System.out.println(ve.toString());
	    DAO dao = new DAO();
	    try {
	        dao.addVe(ve);
	        return ResponseEntity.ok("Vé đã được thêm thành công");
	    } catch (SQLException ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
	    }
	}
}
