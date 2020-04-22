import React from 'react';
import axios from 'axios';
import parseJwt from '../parsejwt';

class EditBio extends React.Component {

    state = {
        biography:''
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
        //decode id token
        await this.createAuthToken();
        console.log("Created token");
        var token = this.config.headers.Authorization.substring(7); //substring 7 to remove "Bearer " from token
        //get details from decoding id token
        var params = parseJwt(token);
        console.log(JSON.stringify(this.config));
        this.setState({reporterid: params.id});
    }
    EditBio(){
        this.setStatestate = {
            bio: ''
        }
    }
    handleChangeGhostBio(event){
        this.setState({biography: event.target.value});
    }

    render() {
        return <>
        <div className ="text-center">
            <div className = "block-example border border-dark m-2">
                    <form className="justify-content-center align-items-center">
                        <h1 className = "formTitle">Report A Ghost Sighting</h1>

                        <div className="form-group">
                            <label htmlFor="sightingTitle">Ghost Biography</label>
                            <input type="text"
                                id="ghostBio"
                                name="ghostBio"
                                className="form-control"
                                placeholder = "Previous Bio"
                                onChange = {e => this.handleChangeGhostBio(e)}
                                required/>
                        </div>

                    </form>
                    <button type = "submit" 
                        className = "btn btn-primary"
                        onClick={e => this.EditBio()}>
                            Submit Biography
                    </button>
            </div>
        </div>
        </>;
    }
}

export default EditBio;