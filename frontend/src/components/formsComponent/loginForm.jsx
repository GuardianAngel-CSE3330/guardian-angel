import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            console.log(token.id_token);
            }
            //https://www.tutorialrepublic.com/faq/how-to-store-javascript-objects-in-html5-localstorage.php
        )
        .catch(res => {
            window.location.replace("http://localhost:3000/")
            alert("Error logging in. Please try again.")
        })
        setTimeout(this.setState({email: '', password: ''}), 1000);
        var frm = document.getElementsByName('login-form')[0];
        frm.reset();
        return false;
 
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
                <form name = "login-form">
                    <h2 className ="signUp">Login</h2>
                    <div className = "form-group">
                        <label htmlFor = "email">Email Address:</label>
                        <input type = "email" className = "form-control"
                            name = "email" 
                            value={this.state.email}
                            placeholder = "Email Address"
                            onChange={e => this.handleChangeUser(e)}/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor = "password">Password:</label>
                        <input type = "password" className = "form-control"
                            name = "password" 
                            value={this.state.password}
                            placeholder = "Password"
                            onChange={e => this.handleChangePW(e)}/>
                    </div> 
                </form>
                {/* How to make this reload the page so that the login form is hidden?*/}
                <Link to = "/"><button type="button" className = "btn btn-primary" onClick={e => this.loginWithCredentials()}>Login</button></Link>
               <Link to="/register"><button className = "btn btn-secondary">Register</button></Link>
            </div>
        )
    }
}
export default LoginForm;