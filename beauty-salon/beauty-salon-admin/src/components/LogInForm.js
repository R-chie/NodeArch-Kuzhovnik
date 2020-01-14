import React, {Fragment} from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import './LogInForm.css';
import authService from '../services/authService';
import { events } from "../events";

class LogInForm extends React.PureComponent {

    static propTypes = {
    };

    state = {
        usernameInput: '',
        passwordInput: '',
    };

    login = async (e) => {
        console.log('login called');
        e.preventDefault();
        let userdata = {
            username: this.state.usernameInput,
            password: this.state.passwordInput,
        };
        let authdata = window.btoa(userdata.username + ':' + userdata.password);
        console.log(`auth data ${authdata} ---> try to auth`);
        let res = await authService.login(authdata).catch(e => console.log(e));
        console.log(res);
        if (res.success){
            localStorage.setItem('beauty_token', `Bearer ${res.token}`);
            events.emit('loggedIn');
        } else {
            console.log(res.message);
        }
    };
    render() {
        return (
            <Fragment>
                <h1 style={{ margin: '0 auto ', textAlign: 'center'}}>Beauty salon admin</h1>
                <div className={'LogInForm'}>
                    <form>
                        <label htmlFor={'name'} style={{margin : '5px'}}>Имя пользователя</label>
                        <InputText
                            id='name'
                            onChange={(e) => this.setState({usernameInput: e.target.value})}/>
                        <label htmlFor={'pass'} style={{margin : '5px'}}>Пароль</label>
                        <Password
                            id={'pass'}
                            promptLabel=''
                            feedback={ false }
                            onChange={(e) => this.setState({passwordInput: e.target.value})}/>
                    </form>
                    <Button className='submit p-button p-button-primary p-button-icon' label='Войти'
                            disabled={!this.state.usernameInput || !this.state.passwordInput}
                            onClick={this.login}/>
                </div>
            </Fragment>
        )
    }
}


export default LogInForm
