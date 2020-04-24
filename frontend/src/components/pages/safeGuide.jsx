import React from 'react';
import axios from 'axios';

class SafeGuide extends React.Component {

    config = {
        headers: {
            Authorization: 'Bearer '
        }
    }

    state = {
        searchParams: '',
        authTokenCreated: false,
        returnedSightings: [],
        hasRenderedContent: false
    }



    async handleButtonPress(){
        debugger;
        if (this.state.hasRenderedContent === true) {
            this.setState({hasRenderedContent: false, returnedSightings: []})
        }
        //If the user has logged in but hasn't created the token yet
        if (!this.state.authTokenCreated) {
            await this.createAuthToken();
        //If the user has not logged in yet
        } else if (this.config.headers.Authorization.localeCompare('Bearer ') == 0) {
            alert("Please log in before searching the database!");
            return;
        }
        //The user has already logged in + has token when searching


        if (!this.state.type) {
            //Search parameter (ghost/location/sighting) wasn't specified
            alert("Please pick a search parameter!");
            return;
        }
        else if (!this.state.searchParams) {
            //No text was entered in the search box
            alert("Please enter text before searching!");
            return;
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
            .then(
                sightings => {
                    var allSights = [];
                    sightings.data.forEach(sighting => {
                        allSights.push(sighting);
                    })
                this.setState({returnedSightings: allSights});
                }
            )
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

        this.setState({hasRenderedContent: true});
    }


    async createAuthToken() {
        var profileToken = await localStorage.getItem('bearer_token');
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


                <div className = "block-example border border-dark m-2 overflow-auto">

                        {this.state.returnedSightings.map(sighting =>
                            <div className = "card m-3">
                            <h5 class="card-title text-center">{sighting.title}</h5>
                             <h6 class="card-subtitle text-muted text-center">{sighting.ghostname}: {sighting.sighting}</h6>
                                <div className = "card-body">
                                    <img class="img-fluid float-left rounded mr-3" src= {sighting.imageurl} 
                                    alt="Card image cap" height="150" width="150"></img>
                                        <div class="card-body">
                                            <p class="card-text">Sighting Description: {sighting.description}</p>
                                            <p class="card-text">Sighting Date: {sighting.month}/{sighting.day}/{sighting.year}</p>
                                            <p class="card-text">Spookiness Level: {sighting.spookiness}</p>
                                            <p class="card-tex text-right">Reported by: {sighting.reporterfirstname} {sighting.reporterlastname}</p>
                                        </div>
                                </div>
                            </div>)}
                </div>
    </div>)
    }

}

export default SafeGuide;