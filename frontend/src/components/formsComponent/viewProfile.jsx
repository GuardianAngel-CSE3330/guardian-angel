import React from 'react';
import parseJwt from '../parsejwt';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewProfile extends React.Component {

    profileToken = localStorage.getItem('bearer_token');

    config = {
        header: 'Bearer '
    }

    createAuthToken() {
        //debugger;
        var profileToken = localStorage.getItem('bearer_token');
        setTimeout(this.config.header = this.config.header.concat(profileToken), 2000);
    }

    render() {
        //decode id token
        this.createAuthToken();
        var token = this.config.header.substring(7); //substring 7 to remove "Bearer " from token
        //debugger;
        //get details from decoding id token
        var params = parseJwt(token);
        //debugger;
        console.log(token)
        axios.get(`http://localhost:8000/api/private/users/${params.id}`, this.config)
        .then(
            //show user profile
            <button>Test</button>
            
        )
        .catch(
        //otherwise (error) display a "you don't have a profile yet"
        )
        return <>
        {/*edit button --> editprofile view */}
        <Link to="/editprofile"><button className="btn btn-secondary">Edit Profile</button></Link>
        </>

    }
}

export default ViewProfile;