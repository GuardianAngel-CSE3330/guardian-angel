import React from 'react';
import parseJwt from '../parsejwt';
import axios from 'axios';

class ViewProfile extends React.Component {

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
        //decode id token
        await this.createAuthToken();
        console.log("Created token");
        var token = this.config.headers.Authorization.substring(7); //substring 7 to remove "Bearer " from token
        debugger;
        //get details from decoding id token
        var params = parseJwt(token);
        console.log(JSON.stringify(this.config));
        await axios.get(`http://localhost:8000/api/private/users/${params.id}`, this.config)
        .then((res) => {
            console.log(res);
        }
            //show user profile
            
        )
        .catch(e =>
            alert("Error")
        //otherwise (error) display a "you don't have a profile yet"
        )
    }

    render() {
    
        return <>
        {/*edit button --> editprofile view */}
        <button className="btn btn-secondary">Edit Profile</button>
        </>

    }

}

export default ViewProfile;