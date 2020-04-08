import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SafeGuide from '../pages/safeGuide.jsx';

class LoginForm extends React.Component{
    state = {
        email: '',
        password: ''
    }

    loginWithCredentials() {
        axios.post(`http://localhost:8000/api/public/users/login`, 
        this.state)
        .then(res => {
            console.log(res);
            }
        )
        //Once you get the bearer token --> store it in local storage
    }


    handleChangeUser(event) {
        this.setState({email: event.target.value});
    }
    handleChangePW(event) {
        this.setState({password: event.target.value});
    }

    render(){
        return(
                <form className = "block-example border border-dark">
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

                    <button type="button" className = "btn btn-primary col-3" onClick={e => this.loginWithCredentials()}>
                        Login
                    </button>
                    <Link to="/profile"><button className = "btn btn-secondary col-3">Register</button></Link>
                </form>
        )
    }
}
export default LoginForm;