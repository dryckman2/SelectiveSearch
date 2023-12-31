import React from 'react';

import { ErrorMessage } from './components/errormessage';
import Error, { ErrorLevel } from "../model/error";
import Account from '../model/account';

import Axios from 'axios'



import { setContext } from '../globalcontext'
import AccountStatus from './components/accountstatus';
import { Navigate } from 'react-router-dom';

type Props = {
}

type State = {
    email: string,
    password: string
    error: Error,
    direct: React.ReactElement,
}

export default class LoginPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        const startingError = new Error(ErrorLevel.NOTICE, "Password are not currently encrypted. Please use with caution");
        startingError.forceFormat(
            <>
                <div>
                    Password are not currently encrypted!
                </div>
                <div>
                    Please use with caution
                </div>
            </>);
        this.state = {
            email: "",
            password: "",
            error: startingError,
            direct: <div />
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }


    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (this.state.email === "") { // TODO: Replace with email validation
            this.setState({ error: new Error(ErrorLevel.ERROR, "Invalid Email") });
            return;
        } else if (this.state.password === "") { // TODO: Replace with password validation
            this.setState({ error: new Error(ErrorLevel.ERROR, "Invalid Password") });
            return;
        }
        let res = await Axios.get(`http://localhost:3002/api/login/${this.state.email}/${this.state.password}`);
        if (res.data.length === 1) {
            setContext("currentAccount", new Account(this.state.email, this.state.password));
            AccountStatus.updater();
            this.setState({ direct: <Navigate to="/accountManagementPage"></Navigate> })
        } else {
            this.setState({ error: new Error(ErrorLevel.WARNING, "Account Not Found") });
        }

    }

    handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        if (this.state.email === "") { // TODO: Replace with email validation
            this.setState({ error: new Error(ErrorLevel.ERROR, "Invalid Email") });
            return;
        } else if (this.state.password === "") { // TODO: Replace with password validation
            this.setState({ error: new Error(ErrorLevel.ERROR, "Invalid Password") });
            return;
        }
        let res = await Axios.get(`http://localhost:3002/api/pingAccount/${this.state.email}`);
        if (res.data.length === 0) {
            const res = await Axios.post(`http://localhost:3002/api/signup/${this.state.email}/${this.state.password}`);
            if (res.status === 200) {
                setContext("currentAccount", new Account(this.state.email, this.state.password));
                AccountStatus.updater();
                this.setState({ direct: <Navigate to="/accountManagementPage"></Navigate> })
            } else {
                this.setState({ error: new Error(ErrorLevel.ERROR, "Some Error Occurred: " + res.status) });
            }
        } else {
            this.setState({ error: new Error(ErrorLevel.ERROR, "Account Already Exists") });
        }
    }

    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: event.target.value });
    }


    render() {
        return (<div>
            <table align='center' className='shadowless'>
                <tbody>
                    <tr>
                        <td width={"100%"} colSpan={100} className='spacer'></td>
                    </tr>
                    <tr>
                        <td colSpan={100} align='center' className='shadowless'><ErrorMessage error={this.state.error} /></td>
                    </tr>
                    <tr>
                        <td className='shadowless'>
                            Email:
                        </td>
                        <td className='shadowless'>
                            <form onSubmit={this.handleSubmit} id="Email">
                                <input value={this.state.email} onChange={this.handleEmailChange} type="text" />
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td className='shadowless'>
                            Password:
                        </td>
                        <td className='shadowless'>
                            <form onSubmit={this.handleSubmit} id="Password" >
                                <input value={this.state.password} onChange={this.handlePasswordChange} type="password" />
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={100} align='center' className='shadowless'>
                            <form onSubmit={this.handleSubmit} id="Submit">
                                <input type="submit" value="Submit" />
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={100} align='center' className='shadowless'>
                            <form onSubmit={this.handleSignUp} id="Sign Up">
                                <input type="submit" value="Sign Up" />
                            </form>
                        </td>
                    </tr>

                </tbody>
            </table>
            <>{this.state.direct}</>
        </div>);
    }
}