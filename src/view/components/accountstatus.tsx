import React from 'react';

import { Link } from 'react-router-dom';
import { globalContext } from '../../globalcontext';

type Props = {
}

class AccountStatus extends React.Component {
    static updater: (callback?: (() => void) | undefined) => void;

    constructor(props: Props) {
        super(props);
        this.state = { display: "Sign In" };

        AccountStatus.updater = () => { super.forceUpdate() };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("Clicked");
        this.setState({ display: "Clicked" })
        this.toLogin()
    }

    toLogin() {
        // navigation.navigate('login')
        console.log("To Login");
    }

    render() {
        if (globalContext.currentAccount.email === "not_signed_in") {
            return (<Link to="login">Sign In</Link>);
        } else {
            return (<div>{globalContext.currentAccount.email}</div>);
        }
    }
}

export default AccountStatus;