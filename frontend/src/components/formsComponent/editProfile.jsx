import React from 'react';
import profile from '../images/profile.png';
import axios from 'axios';
class EditProfileForm extends React.Component {
    state = {
        email: '',
	    password: '',
	    firstname: '',
	    lastname: '',
	    role: ''
    }

    /*
    createProfile(){
        axios.post('http://localhost:8000/api/public/users/create',
        this.state)
        .then (res => {
            console.log(res);
            }
        )
    }
    */

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
        this.setState({role: event.target.value});
    }

    render() {
        return <>
        <div className ="text-center">
            <div className = "block-example border border-dark m-2">
                <form className="justify-content-center align-items-center">
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
                            onChange = {e => this.handleChangeFirstName(e)}
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lname">Last Name*</label>
                        <input type="text"
                            id="lname"
                            name="lname"
                            className="form-control"
                            onChange = {e => this.handleChangeLastName(e)}
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            onChange = {e => this.handleChangeEmail(e)}
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <input type="password"
                            id="password"
                            name="passwrod"
                            className="form-control"
                            onChange = {e => this.handleChangePassword(e)}
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="userType">User Type</label>
                        <br></br>
                        <select id="userType" name="userType" 
                        onChange = {e => this.handleChangeRole(e)}
                        required>
                            <option></option>
                            <option value="author">Author</option>
                            <option value="exorcist">Exorcist</option>
                            <option value="general">General</option>
                            <option value="tormentedSoul">Moderator</option>
                            <option value="reporter">Reporter</option>
                            <option value="tormentedSoul">Tormented Soul</option>
                        </select>
                    </div>

                    
                    <div className="form-group">
                        <label htmlFor="sign">Astrology Sign</label>
                        <br></br>
                        <select id="sign" name="sign" required>
                            <option value="aries">Aries</option>
                            <option value="taurus">Taurus</option>
                            <option value="gemini">Gemini</option>
                            <option value="cancer">Cancer</option>
                            <option value="leo">Leo</option>
                            <option value="libra">Libra</option>
                            <option value="scorpio">Scorpio</option>
                            <option value="dagittrius">Sagittarius</option>
                            <option value="capricorn">Capricorn</option>
                            <option value="aquarius">Aquarius</option>
                            <option value="pisces">Pisces</option>
                        </select>
                    </div>

                    
                    <div className="form-group">
                        <label htmlFor="profilePhoto">Profile Photo: </label>
                        <input type = "file"
                            id="profilePhoto"
                            name="profilePhoto"
                            className="form-control-photo" />
                    </div>

                    <button type = "submit" className = "btn btn-primary">
                        Save Profile
                    </button>
                </form>
            </div>
           
        </div>
        </>;
    }
}

export default EditProfileForm;