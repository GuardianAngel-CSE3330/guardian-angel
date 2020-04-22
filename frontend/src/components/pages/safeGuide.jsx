import React, { Component } from 'react';
import axios from 'axios';

class SafeGuide extends Component {

    config = {
        headers: {
            Authorization: 'Bearer '
        }
    }

    state = {
        searchParams: '',
        authTokenCreated: false,
        returnedSightings: []
    }



    async handleButtonPress(){
        //If the user has logged in but hasn't created the token yet
        if (!this.state.authTokenCreated) {
            await this.createAuthToken();
        //If the user has not logged in yet
        } else if (this.config.headers.Authorization.localeCompare('Bearer ')) {
            alert("Please log in before searching the database!");
            return;
        }
        //The user has already logged in + has token when searching


        if (!this.state.type) {
            //Search parameter (ghost/location/sighting) wasn't specified
            alert("Please pick a search parameter!")
        }
        else if (!this.state.searchParams) {
            //No text was entered in the search box
            alert("Please enter text before searching!")
        }
        else if (this.state.type === 'location') {
            //get all sightings, then search through those for a given location
            await axios.get(`http://localhost:8000/api/private/sightings/all`, this.config)
            .then(
                //object given here will be an array
                sightings => {
                    var allSights = [];
                    sightings.data.forEach(sighting => {
                    if(sighting.location.includes(this.state.searchParams)) {
                        allSights.push(sighting);
                    }
                })
                this.setState({returnedSightings: allSights});
            }
            )
        }
        else if (this.state.type === 'ghost') {
            //fetch all sightings of this particular ghost
            await axios.get(`http://localhost:8000/api/private/sightings/ghost/${this.state.searchParams}`, this.config)
            .then()
            .catch(err =>
                alert(err))
        }
        else if (this.state.type === 'sighting') {
            //get all sightings, then search through titles and descriptions based on search term
            await axios.get(`http://localhost:8000/api/private/sightings/all`, this.config)
            .then(
                //object given here will be an array
                sightings => {
                    var allSights = [];
                    sightings.data.forEach(sighting => {
                        //if it is in title or description, then push it to the
                        if ((sighting.description.includes(this.state.searchParams || 
                            sighting.title.includes(this.state.searchParams)))) {
                                allSights.push(sighting);
                            }
                    })
                this.setState({returnedSightings: allSights});
                }
            )
        }
    }


    async createAuthToken() {
        var profileToken = await localStorage.getItem('bearer_token');
        console.log('|' + profileToken + '|');
        this.config.headers.Authorization = this.config.headers.Authorization.concat(profileToken);
        this.setState({authTokenCreated: true});
    }

    render(){
        return (
            <div>
                <div className = "block-example border border-dark m-2">
                        {/* Capture text/parameter that is given from user*/}
                    <input type="text" placeholder="Search.." value={this.state.searchParams}
                    onChange={e => this.setState({searchParams: e.target.value})}></input>
                    <hr></hr>
                    <input type="radio" id="locSearch" 
                    name="searchType" value="locSearch" onClick={() => this.setState({type: 'location'})}></input>
                        <label htmlFor="locSearch">By Location:  </label>

                    <input type="radio" id="ghoSearch" 
                    name="searchType" value="ghoSearch" onClick={() => this.setState({type: 'ghost'})}></input>
                        <label htmlFor="locSearch">By Ghost:  </label>

                    <input type="radio" id="sigSearch" 
                    name="searchType" value="sigSearch" onClick={() => this.setState({type: 'sighting'})}></input>
                        <label htmlFor="sigSearch">By Sighting:  </label>
                    <button type="button" className="btn btn-primary" 
                    onClick={() => this.handleButtonPress()}>Search the Database</button>
                </div>


                    <div className = "block-example border border-dark m-2">
                       <h4 className=""></h4>
                    </div>
                </div>
    );
    }

    componentDidUpdate() {
        //reset state here after the stuff is rendered
    }
}

export default SafeGuide;