import React, {Fragment} from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Admin from './components/Admin';
import SignIn from './components/SignIn';
import { events } from "./events";

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';
import './App.css';


class App extends React.PureComponent {

  state = {
    logged: false,
  };

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  logout = () => {
    console.log('logged out...');
    this.setState({logged: !this.state.logged})
  };

  login = () => {
    console.log('logged in...');
    this.setState({logged: !this.state.logged})
  };

  render() {
    console.log("App render");
    return (
        <Fragment>
          <BrowserRouter>
            <Route path="/admin" render={ props => this.state.logged ? <Admin cbLogout={this.logout}/> : <Redirect to="/signin"/>} />
            <Route path="/signin"  render={ props => <SignIn cbLogin={this.login}/>} />
            <Route path="/" exact render={ props => <Redirect to="/signin"/>} />
          </BrowserRouter>
        </Fragment>
    );
  }
}

export default App
