import React from 'react';

import { Link } from 'react-router-dom';
import { notSignedInPlaceHolder, globalContext } from '../../globalContext';

type Props = {
}

class AccountStatus extends React.Component {
    static updater: (callback?: (() => void) | undefined) => void;

    constructor(props: Props) {
        super(props);
        this.state = { display: "Sign In" };

        AccountStatus.updater = () => { super.forceUpdate() };
    }


    render() {
        if (globalContext.currentAccount === notSignedInPlaceHolder) {
            return (<td align="right"><Link to="login" className='layoutLinks'>Sign In</Link></td>);
        } else {
            return (<>
                <td align='right' width={"15%"} className='accountButtons'> <Link className="layoutLinks" to="/dataset">Manage Datasets</Link></td>
                <td align='right' width={"3%"} className='accountButtons'><Link className="layoutLinks" to="/accountManagementPage">{globalContext.currentAccount.email}</Link></td>
            </>);
        }
    }
}

export default AccountStatus;