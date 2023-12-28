import React from 'react';

import { currentAccount } from '../../index';
import { Link } from 'react-router-dom';

type Props = {
}

class AccountStatus extends React.Component {

    constructor(props: Props) {
        super(props);
        this.state = { display: "Sign In" };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: Event) {
        console.log("Clicked");
        this.setState({ display: "Clicked" })
    }

    toLogin() {
        // navigation.navigate('login')
        console.log("To Login");
    }

    render() {
        if (currentAccount == null) {
            return (<Link to="login">Sign In</Link>);
        }
        return (<div>Already In</div>);
    }
}

export default AccountStatus;