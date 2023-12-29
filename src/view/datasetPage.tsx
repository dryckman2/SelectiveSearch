import React from "react";
import { Link } from "react-router-dom";
import { globalContext } from "../globalContext";

export default class Dataset extends React.Component {
    render() {
        if (globalContext.currentAccount.email === "not_signed_in") {
            return <>Must sign in to view Datasets</>;
        }
        return (
            <>
                <table className="seentable" width={"100%"}>
                    <thead>
                        <tr>
                            <td width={"15%"}><b><u>Title</u></b></td>
                            <td width={"40%"}><b><u>Description</u></b></td>
                            <td><b><u>Files</u></b></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                This is table setup
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={100} className="addButton" align="center">
                                <Link to="/addDataSet" className="addButton"> Add Dataset </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}

