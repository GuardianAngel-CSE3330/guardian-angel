import React from 'react';
import axios from 'axios';
import parseJwt from '../parsejwt';

class EditBio extends React.Component {

    state = {
        ghostid: 0,
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

        let ghostid = this.props.match.params.id;
        console.log("This is the gohst id: " + ghostid);
        //decode id token
        await this.createAuthToken();
        console.log("Created token");
        var token = this.config.headers.Authorization.substring(7); //substring 7 to remove "Bearer " from token
        //get details from decoding id token
        var params = parseJwt(token);
        console.log(JSON.stringify(this.config));

        await axios.get(`http://localhost:8000/api/private/ghosts/id/${ghostid}`, this.config)
        .then(res => {
            //Once you get the bearer token --> store it in local storage
            console.log(res.data);
            this.setState({ghostid:res.data.ghostid});
            this.setState({name: res.data.name});
            this.setState({biography: res.data.biography});
            }   
        );
    }
    UpdateBio(){
        let obj= {};
        //...fill your object like this for example
        obj["biography"] = this.state.biography;
        axios.patch(`http://localhost:8000/api/private/ghosts/id/${this.state.ghostid}`, 
        obj,
        this.config,)
        .then(res => {
            //Once you get the bearer token --> store it in local storage
            console.log("Done" + res.data);
            alert("Biography was updated!")
            }   
        ).catch((e) => {
            console.log(e);
        });
    }
    handleChangeGhostBio(event){
        this.setState({biography: event.target.value});
    }

    render() {
        return <>
        <div className ="text-center align-middle">
            <div className = "block-example border border-dark m-2">
                    <form name="ghost-form"className="justify-content-center align-items-center">
                    <h1 className = "formTitle">{this.state.name}</h1>

                        <div className="form-group">
                            <label htmlFor="ghostBio">Ghost Biography*</label>
                            <input type="text"
                                id="ghostBio"
                                name="ghostBio"
                                className="form-control"
                                value={this.state.biography}
                                onChange = {e => this.handleChangeGhostBio(e)}
                                required/>
                        </div>
                    </form>
                    <button type = "submit" 
                        className = "btn btn-primary"
                        onClick={e => this.UpdateBio()}>
                            Update Biography
                    </button>
            </div>
        </div>
        </>;
    }
}

export default EditBio;