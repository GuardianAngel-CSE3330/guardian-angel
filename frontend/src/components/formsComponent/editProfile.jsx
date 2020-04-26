import React from 'react';
import profile from '../images/profile.png';
import parseJwt from '../parsejwt';
import axios from 'axios';
class EditProfileForm extends React.Component {
    state = {
        id: 0,
        email: '',
	    firstname: '',
        lastname: '',
        img_url: ''
    }
    obj = {
    }
    config = {
        headers: {
            Authorization: 'Bearer '
        }
    }
    async createAuthToken() {
        var profileToken = await localStorage.getItem('bearer_token');
        console.log('|' + profileToken + '|');
        this.config.headers.Authorization = this.config.headers.Authorization.concat(profileToken);
    }

    async componentDidMount() {

        let profileid = this.props.match.params.id;
        console.log("This is the profile id: " + profileid);
        //decode id token
        await this.createAuthToken();
        console.log("Created token");
        var token = this.config.headers.Authorization.substring(7); //substring 7 to remove "Bearer " from token
        //get details from decoding id token
        var params = parseJwt(token);
        console.log(JSON.stringify(this.config));

        await axios.get(`http://localhost:8000/api/private/users/${profileid}`, this.config)
        .then(res => {
            //Once you get the bearer token --> store it in local storage
            console.log(res.data);
            this.setState({id: res.data.id});
            this.setState({email: res.data.email});
            this.setState({firstname: res.data.firstname});
            this.setState({lastname: res.data.lastname});
            this.setState({img_url: res.data.img_url});
            console.log(this.state);
            }   
        );
    }
    UpdateProfile(){
        console.log(this.obj);
        console.log(this.state.lastname)
        axios.patch(`http://localhost:8000/api/private/users/${this.state.id}`, 
        this.obj,
        this.config,)
        .then(res => {
            //Once you get the bearer token --> store it in local storage
            console.log("Done" + res.data);
            alert("Profile was updated!")
            }   
        ).catch((e) => {
            console.log(e);
        });
    }

    handleChangeFirstName(event){
        this.setState({firstname: event.target.value});
        this.obj["firstname"] = event.target.value;
    } 
    handleChangeLastName(event){
        this.setState({lastname: event.target.value});
        this.obj["lastname"] = event.target.value;
    }
    handleChangeEmail(event){
        this.setState({email: event.target.value});
        this.obj["email"] = event.target.value
    }
    handleChangePicture(event){
        this.setState({img_url: event.target.value});
        this.obj["img_url"] = event.target.value;
    }

    render() {
        return <>
        <div className ="text-center">
            <div className = "block-example border border-dark m-2">
                <form className="justify-content-center align-items-center">
                    <h1 className = "formTitle">My Profile</h1>

                    <div className = "defaultImage">
                        <img src = {this.state.img_url} alt = "defaultImage" height="150" width="150" className = "defaultImage"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fname">First Name*</label>
                        <input type="text"
                            id="fname"
                            name="fname"
                            className="form-control"
                            value = {this.state.firstname}
                            onChange = {e => this.handleChangeFirstName(e)}
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lname">Last Name*</label>
                        <input type="text"
                            id="lname"
                            name="lname"
                            className="form-control"
                            value= {this.state.lastname}
                            onChange = {e => this.handleChangeLastName(e)}
                            required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={this.state.email}
                            onChange = {e => this.handleChangeEmail(e)}
                            required/>
                    </div>

                    
                    <div className="form-group">
                        <label htmlFor="profilePhoto">Profile Photo: </label>
                        <input type = "text"
                            id="profilePhoto"
                            name="profilePhoto"
                            value={this.state.img_url}
                            className="form-control-photo"
                            onChange = {e => this.handleChangePicture(e)} />
                    </div>

                    
                </form>
                <button type = "submit" className = "btn btn-primary" onClick={e => this.UpdateProfile()}>
                        Save Profile
                </button>
            </div>
           
        </div>
        </>;
    }
}

export default EditProfileForm;