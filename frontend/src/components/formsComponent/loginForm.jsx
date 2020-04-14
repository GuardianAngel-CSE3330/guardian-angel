import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SafeGuide from '../pages/safeGuide';

class LoginForm extends React.Component{
    state = {
        email: '',
        password: ''
    }

    loginWithCredentials() {
        axios.post(`http://localhost:8000/api/public/users/login`, 
        this.state)
        .then(res => {
            //Once you get the bearer token --> store it in local storage
            var queryResult = JSON.stringify(res.data);
            var token = JSON.parse(queryResult);
            localStorage.setItem("bearer_token", token.id_token);
            }
            //https://www.tutorialrepublic.com/faq/how-to-store-javascript-objects-in-html5-localstorage.php
        )
        setTimeout(this.setState({email: '', password: ''}), 1000);
 
    }


    handleChangeUser(event) {
        this.setState({email: event.target.value});
    }
    handleChangePW(event) {
        this.setState({password: event.target.value});
    }

    render(){
        return(
            <div className = "block-example border border-dark text-center">
                <form>
                    <h2 className ="signUp">Login</h2>
                    <div className = "form-group">
                        <label htmlFor = "email">Email Address:</label>
                        <input type = "email" className = "form-control"
                            name = "email" 
                            value={this.state.email}
                            onChange={e => this.handleChangeUser(e)}/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor = "password">Password:</label>
                        <input type = "password" className = "form-control"
                            name = "password" 
                            value={this.state.password}
                            onChange={e => this.handleChangePW(e)}/>
                    </div> 
                </form>
                <Link to = "/safeguide"><button type="button" className = "btn btn-primary" onClick={e => this.loginWithCredentials()}>Login</button></Link>
               <Link to="/register"><button className = "btn btn-secondary">Register</button></Link>
            </div>
        )
    }
}
export default LoginForm;