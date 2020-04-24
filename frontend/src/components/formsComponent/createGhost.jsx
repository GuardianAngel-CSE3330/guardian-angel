import React from 'react';
import axios from 'axios';

class CreateGhost extends React.Component {
    state = {
        name: '', 
        biography: ''
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
        //get details from decoding id token
        console.log(JSON.stringify(this.config));
    }
    

    createGhost(){
        axios.put('http://localhost:8000/api/private/ghosts/create',
        this.state,
        this.config
        ).then(res => {
            //Once you get the bearer token --> store it in local storage
            console.log(res)
            }   
        );
        this.setState = {
            name: '', 
            biography: ''
        }
        var frm = document.getElementsByName('ghost-form')[0];
        frm.reset();
        return false;
    }
    
    
    handleChangeGhostName(event){
        this.setState({name: event.target.value});
    }
    handleChangeBio(event){
        this.setState({biography: event.target.value});
    }

    render() {
        return <>
        <div className ="text-center align-middle">
            <div className = "block-example border border-dark m-2">
                    <form name="ghost-form"className="justify-content-center align-items-center">
                        <h1 className = "formTitle">Create a Ghost</h1>

                        <div className="form-group">
                            <label htmlFor="ghostName">Ghost Name*</label>
                            <input type="text"
                                id="ghostName"
                                name="ghostName"
                                className="form-control"
                                placeholder = "Ghost's Name"
                                onChange = {e => this.handleChangeGhostName(e)}
                                required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ghostBio">Ghost Biography*</label>
                            <input type="text"
                                id="ghostBio"
                                name="ghostBio"
                                className="form-control"
                                placeholder="Ghost's Biography"
                                onChange = {e => this.handleChangeBio(e)}
                                required/>
                        </div>
                    </form>
                    <button type = "submit" 
                        className = "btn btn-primary"
                        onClick={e => this.createGhost()}>
                            Submit Sighting
                    </button>
            </div>
        </div>
        </>;
    }
}

export default CreateGhost;