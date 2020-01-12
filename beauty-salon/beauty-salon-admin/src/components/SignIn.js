import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import isoFetch from "isomorphic-fetch";
import { withRouter } from "react-router-dom";

import LogInForm from '../components/LogInForm';
import { events } from "../events";

import C from "../constants";


class SignIn extends React.PureComponent {

    static propTypes = {
        cbLogin: PropTypes.func,
    };

    componentDidMount() {
        events.addListener('loggedIn', this.signin)
    }

    componentWillUnmount() {
        events.removeListener('loggedIn', this.signin)
    }

    signin = () => {
        this.props.cbLogin();
        this.props.history.push('/admin');
    };

    render() {
        console.log("SignIn render");
        return (
            <Fragment>
                <div className="p-grid m-x-y-0 p-nogutter p-dir-col">
                    <div className='container p-col-12 p-lg-12'>
                        <LogInForm/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(SignIn)