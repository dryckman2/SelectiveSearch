import React from "react";
import { Outlet, Link } from "react-router-dom";
import AccountStatus from "./components/accountstatus";

const Layout = () => {
    return (
        <>
            <div className="Header">
                <table width={"100%"}>
                    <tbody>
                        <tr>
                            <td width={"55px"}><Link to="/">Home</Link></td>
                            <td width={"130px"}><Link to="/dataset">Manage Datasets</Link></td>
                            <td width={"150px"}><Link to="/view">View Set</Link></td>
                            <td align="right"><AccountStatus /></td>
                        </tr>
                    </tbody>
                </table>
            </div >
            <Outlet />
        </>
    )
};

export default Layout;