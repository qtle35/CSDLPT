import React, { useState, useEffect } from 'react';
import LaptopService from '../services/LaptopService';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const SanBayComponent = () => {
    const [sb, setSB] = useState([]);
    const [selectedSB, setSelectedSB] = useState({});
    const [dsCB, setDsCB] = useState([])
    useEffect(() => {
        axios.get('api/dstensb').then(res => setSB(res.data))
    }, [])
    useEffect(() => {
        axios.post('api/dscbvalue', selectedSB)
            .then(res => setDsCB(res.data))
    }, [selectedSB]);

    return (
        <div className="container">
            <select className="form-select" onChange={e => setSelectedSB(sb.find(item => item.maSB === e.target.value))}>
                <option value="" disabled selected>-- Chọn tên sân bay --</option>
                {sb.map((sb1) => (
                    <option value={sb1.maSB}>{sb1.tenSB}</option>
                ))}
            </select>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Mã Chuyến Bay</th>
                        <th scope="col">Tên Máy Bay</th>
                        <th scope="col">Sân Bay Xuất Phát</th>
                        <th scope="col">Sân Bay Đích</th>
                    </tr>
                </thead>
                <tbody>
                    {dsCB.map((dscb) => (
                        <tr key={dscb.maCB}>
                            <td>{dscb.maCB}</td>
                            <td>{dscb.tenMB}</td>
                            <td>{dscb.sanBayXuatPhat}</td>
                            <td>{dscb.sanBayDich}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SanBayComponent;
