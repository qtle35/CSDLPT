import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ListVeBanComponent() {
    const [VeBan, setVeBan] = useState([]);

    useEffect(() => {
        axios.get('api/dsveban').then(res => setVeBan(res.data));
    }, []);
    console.log(VeBan)
    return (
        <div className="container">
            <h1 className="my-4 text-center">Danh sách vé bán lớn hơn 2tr tại Đà Nẵng và Quảng Ninh</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Mã Nhân Viên</th>
                        <th scope="col">Tên Nhân Viên</th>
                        <th scope="col">Số lượng vé đã bán</th>
                    </tr>
                </thead>
                <tbody>
                    {VeBan.map((veban) => (
                        <tr key={veban.maNV}>
                            <td>{veban.maNV}</td>
                            <td>{veban.tenNV}</td>
                            <td>{veban.svve}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListVeBanComponent;
