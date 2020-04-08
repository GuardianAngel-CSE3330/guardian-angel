import React from 'react';
import profile from '../images/profile.png';
class ProfileForm extends React.Component {
    render() {
        return <>
        <div className ="text-center">
            <div className = "block-example border border-dark">
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
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lname">Last Name*</label>
                        <input type="text"
                            id="lname"
                            name="lname"
                            className="form-control"
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <input type="password"
                            id="password"
                            name="passwrod"
                            className="form-control"
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
                        <select id="userType" name="userType" required>
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
                        Create Profile
                    </button>
                </form>
            </div>
           
        </div>
        </>;
    }
}

export default ProfileForm;