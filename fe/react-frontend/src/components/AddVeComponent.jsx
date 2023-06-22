import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddVeComponent = () => {
    const navigate = useNavigate();
    const [maNV, setMaNV] = useState([]);
    const [maCB, setMaCB] = useState([]);
    const [maKH, setMaKH] = useState([]);
    const [ve, setVe] = useState({
        maV: '',
        maKH: '',
        maCB: '',
        maNV: '',
        giaVe: 0
    });

    useEffect(() => {
        axios.get('api/dsmanv').then(res => setMaNV(res.data));
        axios.get('api/dsmacb').then(res => setMaCB(res.data));
        axios.get('api/dsmakh').then(res => setMaKH(res.data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVe((prevVe) => ({
            ...prevVe,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/api/addve', ve)
            .then(() => {
                window.location.href = '/';
            })
            .catch((error) => {
                alert(error.response.data);
                console.log(error.response.data);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="maV" className="form-label">Mã vé:</label>
                            <input type="text" id="maV" className="form-control" placeholder="Mã vé" name="maV" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="maKH" className="form-label">Mã khách hàng:</label>
                            <select className="form-select" id="maKH" name="maKH" onChange={handleChange}>
                                <option value="" disabled selected>-- Chọn mã khách hàng --</option>
                                {maKH.map((makh) => (
                                    <option key={makh} value={makh}>{makh}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="maCB" className="form-label">Mã chuyến bay:</label>
                            <select className="form-select" id="maCB" name="maCB" onChange={handleChange}>
                                <option value="" disabled selected>-- Chọn mã chuyến bay --</option>
                                {maCB.map((macb) => (
                                    <option key={macb} value={macb}>{macb}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="maNV" className="form-label">Mã nhân viên:</label>
                            <select className="form-select" id="maNV" name="maNV" onChange={handleChange}>
                                <option value="" disabled selected>-- Chọn mã nhân viên --</option>
                                {maNV.map((manv) => (
                                    <option key={manv} value={manv}>{manv}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="giaVe" className="form-label">Giá vé:</label>
                            <input type="number" id="giaVe" className="form-control" placeholder="Giá vé" name="giaVe" onChange={handleChange} />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVeComponent;
