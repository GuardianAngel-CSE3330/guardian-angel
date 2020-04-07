import React from 'react';
import axios from 'axios';
class LoginForm extends React.Component{
    state = {
        email: '',
        password: ''

    }


    loginWithCredentials() {
        axios.post(`172.18.0.2:8000/api/public/users/login`, 
        this.state)
        .then(res => {
            debugger;
            console.log(res);
            }
        )
    }


    handleChangeUser(event) {
        this.setState({email: event.target.value});
    }
    handleChangePW(event) {
        this.setState({password: event.target.value});
    }

    render(){
        return(
            <div className = "column">
                <form className = "loginForm">
                    <h2 className ="signUp">Login</h2>
                    <div className = "form-group">
                        <label htmlFor = "email">Email Address:</label>
                        <input type = "email" className = "form-control"
                            name = "email" 
                            onChange={e => this.handleChangeUser(e)}/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor = "password">Password:</label>
                        <input type = "password" className = "form-control"
                            name = "password" 
                            onChange={e => this.handleChangePW(e)}/>
                    </div>
                    <button type = "submit" className = "btn btn-primary" onClick={() => this.loginWithCredentials()}>
                        Login
                    </button>
                    <button type = "submit" className = "btn btn-secondary">
                        Register
                    </button>
                </form>
            </div>
        )
    }
}
export default LoginForm;