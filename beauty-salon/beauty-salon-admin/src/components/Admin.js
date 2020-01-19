import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { events } from "../events";
import AdminRouter from "./router/AdminRouter";

class Admin extends React.PureComponent {

    static propTypes = {
        cbLogout: PropTypes.func,
    };

    state = {
        today: '',
    };

    componentDidMount() {
        this.props.history.push('/admin/home'); // navigate by default
        events.addListener('loggedOut', this.logoutReq);
        this.date();
    }

    componentWillUnmount() {
        events.removeListener('loggedOut', this.logoutReq);
    }

    logoutReq = () => {
        console.log('logout called');
    };

    date = () => {
        setInterval(()=> {
            let today = new window.Date().toLocaleString();
            this.setState({today})
        }, 1000)
    };

    render() {
        console.log("Admin render");
        return (
            <Fragment>
                <div key={'mainPage'} className='p-grid p-col-12 p-lg-12 p-dir-col' style={{padding: '1px', margin: '0'}}>
                    <div className='navigation p-col-12 p-lg-12' style={{padding: "0"}}>
                        <div>
                            <NavLink to={'/admin/home'} activeClassName={'navigation-active'}> Главная </NavLink>
                        </div>
                        <div>
                            <NavLink to={'/admin/office'} activeClassName={'navigation-active'}> Офис </NavLink>
                        </div>
                        <div>
                            <NavLink to={'/admin/editor'} activeClassName={'navigation-active'}> Редактор </NavLink>
                        </div>
                    </div>
                    <h2 style={{paddingLeft: '10px'}} key={'today'}> Сегодня {this.state.today} </h2>
                    <div className={'p-col-12 p-lg-12'}>
                        <AdminRouter/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Admin)