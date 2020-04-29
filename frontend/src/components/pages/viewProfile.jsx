import React from 'react';
import parseJwt from '../parsejwt';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MySightings from '../pages/mySightings.jsx';


class ViewProfile extends React.Component {

    config = {
        headers: {
            Authorization: 'Bearer '
        }
    }

    state = {
        profile: []
    }

    async createAuthToken() {
        var profileToken = await localStorage.getItem('bearer_token');
        console.log('|' + profileToken + '|');
        this.config.headers.Authorization = this.config.headers.Authorization.concat(profileToken);
    }

    async componentDidMount() {
        
        if (localStorage.getItem('bearer_token') != null) {
            await this.createAuthToken();
        } else {
            //WHY IS THIS NOT REDIRECTING BACK TO HOMEPAGE
            window.location.replace("localhost:3000/")
            alert("Please log in before viewing your Profile");
            return;
        }
        

        //decode id token
        console.log("Created token");
        var token = this.config.headers.Authorization.substring(7); //substring 7 to remove "Bearer " from token
        //get details from decoding id token
        var params = parseJwt(token);
        console.log(JSON.stringify(this.config));
        await axios.get(`http://localhost:8000/api/private/users/${params.id}`, this.config)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            this.setState({profile: res.data});
        })
        .catch((e) => {
            alert(e + ": Error, you don't have a profile yet!")
        //otherwise (error) display a "you don't have a profile yet"
        })
    }

    render() {
    
        return <>
        <div className="container-fluid">
            {/*Why is profile classes not working?*/}
            <div className="card">
                <h3 className="btn-light">My Profile:</h3>
                <div className="card-body">
                    <img className="img-fluid float-left rounded mr-3" src={this.state.profile.img_url} 
                    alt="Profile" height="100" width="100"></img>
                    <h4>Name: {this.state.profile.firstname + " " + this.state.profile.lastname} </h4>
                    <div className="badge badge-primary">
                        Role: 
                         {" (" +(this.state.profile.roleid===1 ? "Admin" :(this.state.profile.roleid===2 ? "Reporter" : "Exorcist")) +")"}
                    </div>
                    <div className = "text-right">
                        <Link className = "btn btn-warning mr-2" to = {'/mysightings/' + this.state.profile.id}>View My Sightings</Link>
                        <Link className = "btn btn-secondary" to = {'/editprofile/' + this.state.profile.id }> Edit Profile</Link>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
            <div className="card-footer"></div>
            <div>
        </div>
        </div>
        </>

    }

    componentWillUnmount() {
        this.setState({email: '', firstname: '', lastname: '', id: '', img_url: '', roleid: ''})
    }

}

export default ViewProfile;