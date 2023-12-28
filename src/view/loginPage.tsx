import React from 'react';

import { ErrorMessage } from './components/errormessage';
import Error, { ErrorLevel } from "../model/error";

type Props = {

}

type State = {
    email: string,
    password: string
    error: Error,
}

export default class LoginPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: new Error(),
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }


    handleSubmit = (event: React.FormEvent) => {
        if (this.state.email === "") { // TODO: Replace with email validation
            this.setState({ error: new Error(ErrorLevel.ERROR, "Invalid Email") });
        } else if (this.state.password === "") { // TODO: Replace with password validation
            this.setState({ error: new Error(ErrorLevel.ERROR, "Invalid Password") });
        } else {
            this.setState({ error: new Error(ErrorLevel.WARNING, "Login Not Implemented") });
            console.log(this.state.email + ":  " + this.state.password)
        }
        event.preventDefault();
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

                </tbody>
            </table>
        </div>);
    }
}