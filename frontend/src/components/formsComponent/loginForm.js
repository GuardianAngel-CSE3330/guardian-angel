import React, {Component} from 'react';
class LoginForm extends Component{
    render(){
        return(
            <div className = "column">
                <form className = "loginForm">
                    <h2 className ="signUp">Login</h2>
                    <div className = "form-group">
                        <label htmlFor = "email">Email Address:</label>
                        <input type = "email" className = "form-control"
                            name = "email" />
                    </div>
                    <div className = "form-group">
                        <label htmlFor = "password">Password:</label>
                        <input type = "passwprd" className = "form-control"
                            name = "password" />
                    </div>
                    <button type = "submit" className = "btn btn-primary">
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