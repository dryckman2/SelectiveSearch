import React from "react";
import { setContext } from "../globalContext";
import Account from "../model/account";
import AccountStatus from "./components/accountstatus";

import { Navigate } from 'react-router-dom';

type Props = {}

type State = {
    direct: React.ReactElement
}

export default class AccountManagementPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            direct: <div />
        }
    }


    onClick = () => {
        setContext("currentAccount", new Account("not_signed_in", ""));
        AccountStatus.updater();
        this.setState({ direct: <Navigate to="/login"></Navigate> })
    }

    render() {
        return (
            <>
                <div>TODO: Implement management page</div>
                <div>
                    <button type="button" onClick={this.onClick}>Sign Out</button>
                </div>
                <>{this.state.direct}</>
            </>);
    }
}