import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { events } from "../events";

class Admin extends React.PureComponent {

    static propTypes = {
        cbLogout: PropTypes.func,
    };

    componentDidMount() {
        events.addListener('loggedOut', this.logoutReq);
    }

    componentWillUnmount() {
        events.removeListener('loggedOut', this.logoutReq);
    }

    logoutReq = () => {
        console.log('logout called');
    };

    render() {
        console.log("Admin render");
        return (
            <Fragment>
                {/*<Growl ref={(el) => this.growl = el} position="bottomright" />
                <div className={window.innerWidth > 1280 ? "p-grid m-x-y-0 p-nogutter p-dir-col" : "p-grid m-x-y-0 p-nogutter p-dir-col"} style={{backgroundColor: `#FFFFFF`}}>
                    <Header/>

                    <div className='container p-col-12 p-lg-12 flex10a'>
                        <SidePanel/>
                        <div className='flex-90 pages-content'>
                            <AdminRouter/>
                        </div>
                    </div>
                </div>*/}
                <div> ADMIN </div>
            </Fragment>
        );
    }
}

export default withRouter(Admin)