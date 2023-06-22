import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Nav.css'; // Import the custom CSS file for styling
import axios from 'axios';

function Nav() {
    const [ve, setVe] = useState([]);
    useEffect(() => {
        axios.get('api/dsve').then(res => setVe(res.data));
    }, []);

    return (
        <div>
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <div className="navbar-collapse justify-content-center">
                        <ul className="navbar-nav nav-center">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/veban">
                                    <div className="nav-item-wrapper">
                                        <span className="nav-item-text__vertical">Danh sách vé bán lớn hơn 2tr</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/sanbay">
                                    <div className="nav-item-wrapper">
                                        <span className="nav-item-text__vertical">Sân Bay</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/themve">
                                    <div className="nav-item-wrapper">
                                        <span className="nav-item-text__vertical">Thêm Vé</span>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                <h1 className="my-4 text-center">Danh sách vé </h1>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Mã vé</th>
                            <th scope="col">Mã khách hàng</th>
                            <th scope="col">Mã chuyến bay</th>
                            <th scope="col">Mã nhân viên</th>
                            <th scope="col">Giá vé</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ve.map((ve) => (
                            <tr key={ve.maV}>
                                <td>{ve.maV}</td>
                                <td>{ve.maKH}</td>
                                <td>{ve.maCB}</td>
                                <td>{ve.maNV}</td>
                                <td>{ve.giaVe}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Outlet />
        </div>
    );
}

export default Nav;
