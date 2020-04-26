import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewSightings extends React.Component {
    state = {
        allGhosts: []
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
        axios.get('http://localhost:8000/api/private/sightings/all',
        this.config
        ).then(res => {
            //Once you get the bearer token --> store it in local storage
            console.log(res);
            this.setState({allGhosts: res.data});
            console.log(this.state.allGhosts)
            console.log("All Ghosts" + this.state.allGhosts.map((x) => x.name));
            }   
        );
        
    }
    
    render() {
    
        return <>
                <h3 className="text-center mt-2">All Sightings</h3>
                {
                    this.state.allGhosts.map((x,i) => 
                    <div className = "card m-3">
                        <h5 className="card-title text-center mt-2">{x.title}</h5>
                        <h6 className="card-subtitle text-muted text-center">{x.ghostname}: {x.ghostbio}</h6>
                            <div className = "card-body">
                                <img className="img-fluid float-left rounded mt-4 mr-3" src= {x.imageurl} alt="Card image cap" height="150" width="150"></img>
                                <div className="card-body d-block">
                                    <p className="card-text">Sighting Description: {x.description}</p>
                                    <p className="card-text">Sighting Location: {x.location}</p>
                                    <p className="card-text">Sighting Date: {x.month}/{x.day}/{x.year}</p>
                                    <p className="card-text">Spookiness Level: {x.spookiness}</p>
                                    <p className="card-text text-right">Reported by: {x.reporterfirstname}  {x.reporterlastname}</p>
                                </div>
                            </div>
                    </div>
                    )
                }
        </>

    }


}

export default ViewSightings;