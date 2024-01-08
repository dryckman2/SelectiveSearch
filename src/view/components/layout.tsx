import React from "react";
import { Outlet, Link } from "react-router-dom";
import AccountStatus from "./accountstatus";

class Layout extends React.Component {
    render() {
        return (
            <>
                <div className="Header">
                    <table width={"100%"}>
                        <tbody>
                            <tr>
                                <td width={"1%"} align="left" className="accountButtons"><Link className="layoutLinks" to="/">Home</Link></td>
                                <td width={"4%"} align="left" className="accountButtons"><Link className="layoutLinks" to="/viewLiveSet">Live Set</Link></td>
                                <td width={"5%"} align="left" className="accountButtons"><Link className="layoutLinks" to="/viewDataSetPage/none">View Set</Link></td>
                                <td></td>
                                <AccountStatus />
                            </tr>
                        </tbody>
                    </table>
                </div >
                <Outlet />
            </>
        )
    };
}
export default Layout;