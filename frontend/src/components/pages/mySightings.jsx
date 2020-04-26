import React from 'react';
import axios from 'axios';
import parseJwt from '../parsejwt';
import { Link } from 'react-router-dom';

class MySightings extends React.Component {


    state = {
        sightings: []
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

        let reporterid = this.props.match.params.id;
        console.log("This is the reporter id: " + reporterid);
        //decode id token
        await this.createAuthToken();
        console.log("Created token");
        var token = this.config.headers.Authorization.substring(7); //substring 7 to remove "Bearer " from token
        //get details from decoding id token
        var params = parseJwt(token);
        console.log(JSON.stringify(this.config));

        await axios.get(`http://localhost:8000/api/private/sightings/reporter/${reporterid}`, this.config)
        .then(res => {
            //Once you get the bearer token --> store it in local storage
            console.log(res.data);
            this.setState({sightings: res.data});
            console.log(this.state.sightings);
            }   
        ).catch((e) => {
            console.log(e);
        });
    }

    deleteSighting(sightingid){
        axios.delete(`http://localhost:8000/api/private/sightings/${sightingid}`, this.config)
        .then(res => {
            //Once you get the bearer token --> store it in local storage
            console.log(res.data);
            alert("Sighting deleted!");
            window.location.reload();
            }   
        ).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return <>
            <h3 className="text-center mt-2">My Reported Sightings</h3>
            {
                this.state.sightings.map((x,i) => 
                <div className = "container">
                    <div  className = "card m-3">
                    <h5 className="card-title mt-2 text-center">{x.title}</h5>
                        <div className = "card-body">
                            <img className="img-fluid float-left rounded mt-4 mr-3" src= {x.imageurl} alt="Card image cap" height="150" width="150"></img>
                            <div className="card-body d-block">
                                <p className="card-text">Sighting Description: {x.description}</p>
                                <p className="card-text">Sighting Location: {x.location}</p>
                                <p className="card-text">Sighting Date: {x.month}/{x.day}/{x.year}</p>
                                <p className="card-text">Spookiness Level: {x.spookiness}</p>
                            </div>
                        </div>
                    <div className = "text-right m-3">
                        <button className = "btn btn-danger" onClick = {e => this.deleteSighting(x.sightingid)}>
                            Delete
                        </button>
                    </div>
                    </div>
                </div>
                
                )
            }
        </>;
    }
}

export default MySightings;