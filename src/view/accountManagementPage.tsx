import React from "react";
import { notSignedInPlaceHolder, globalContext, setContext } from "../globalcontext";
import AccountStatus from "./components/accountstatus";

import { Navigate } from 'react-router-dom';
import Axios from 'axios'

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


    onClickSignOut = () => {
        setContext("currentAccount", notSignedInPlaceHolder);
        AccountStatus.updater();
        this.setState({ direct: <Navigate to="/login"></Navigate> })
    }

    onClickDeleteAccount = async () => {
        const currentAccount = globalContext.currentAccount;
        let res = await Axios.delete(`http://localhost:3002/api/deleteAccount/${currentAccount.email}/${currentAccount.password}`)
        console.log(res)
        this.onClickSignOut();
    }

    render() {
        return (
            <>
                <div>TODO: Implement management page</div>
                <div>
                    <button type="button" onClick={this.onClickSignOut}>Sign Out</button>
                </div>
                <div>
                    <button type="button" onClick={this.onClickDeleteAccount}>Delete Account</button>
                </div>
                <>{this.state.direct}</>
            </>);
    }
}