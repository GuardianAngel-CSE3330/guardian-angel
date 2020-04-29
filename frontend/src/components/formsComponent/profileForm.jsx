import React from 'react';
import profile from '../images/profile.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
class ProfileForm extends React.Component {
    state = {
        email: '',
	    password: '',
	    firstname: '',
	    lastname: '',
	    role: ''
    }

    createProfile(){
        axios.put('http://localhost:8000/api/public/users/create',
        this.state)
        .then (res => {
            console.log(res);
            }
        );
        this.setState({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            roleid: ''
        });
        var frm = document.getElementsByName('register-form')[0];
        frm.reset();
        return false;
    }


    handleChangeFirstName(event){
        this.setState({firstname: event.target.value});
    } 
    handleChangeLastName(event){
        this.setState({lastname: event.target.value});
    }
    handleChangeEmail(event){
        this.setState({email: event.target.value});
    }
    handleChangePassword(event){
        this.setState({password: event.target.value});
    }
    handleChangeRole(event){
        this.setState({roleid: event.target.value});
    }

    render() {
        return <>
            <div className = "block-example border border-dark text-center m-2">
                <form name = "register-form"className="justify-content-center align-items-center ">
                    <h1 className = "formTitle">User Profile</h1>

                    <div className = "defaultImage">
                        <img src = {profile} alt = "defaultImage" className = "defaultImage"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fname">First Name*</label>
                        <input type="text"
                            id="fname"
                            name="fname"
                            className="form-control"
                            placeholder = "First Name"
                            onChange = {e => this.handleChangeFirstName(e)}
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lname">Last Name*</label>
                        <input type="text"
                            id="lname"
                            name="lname"
                            className="form-control"
                            placeholder = "Last Name"
                            onChange = {e => this.handleChangeLastName(e)}
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder = "Email Address"
                            onChange = {e => this.handleChangeEmail(e)}
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <input type="password"
                            id="password"
                            name="passwrod"
                            placeholder = "Password"
                            className="form-control"
                            onChange = {e => this.handleChangePassword(e)}
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="userType">User Type</label>
                        <br></br>
                        <select id="userType" name="userType" 
                        onChange = {e => this.handleChangeRole(e)}
                        required>
                            <option></option>
                            <option value="1">Admin</option>
                            <option value="2">Reporter</option>
                            <option value="3">Exorcist</option>
                        </select>
                    </div>

                    
                </form>
                <Link to="/">
                <button type = "submit" 
                    className = "btn btn-primary"
                    onClick={e => this.createProfile()}>
                        Create Profile
                </button>
                </Link>
            </div>
        </>;
    }
}

export default ProfileForm;