import React from 'react';
import axios from 'axios';
import parseJwt from '../parsejwt';
import { Link } from 'react-router-dom';

class ViewSightings extends React.Component {
    state = {
        allGhosts: [],
        roleid: 0
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
        
        var token = this.config.headers.Authorization.substring(7); //substring 7 to remove "Bearer " from token
        //get details from decoding id token
        var params = parseJwt(token);
        console.log(JSON.stringify(this.config));
        await axios.get(`http://localhost:8000/api/private/users/${params.id}`, this.config)
        .then((res) => {
            console.log(res.data);
            if(res.data.roleid == 1){
                this.setState({roleid: 1});
            }
            console.log("Role ID::: " + this.state.roleid);
        })
        .catch((e) => {
            alert(e + ": Error, you don't have a profile yet!")
        //otherwise (error) display a "you don't have a profile yet"
        })
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
        if(this.state.roleid){
            return <>
                <h3 className="text-center mt-2">All Sightings(Admin View)</h3>
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
                            <div className = "text-right m-2">
                                <button className = "btn btn-danger" onClick = {e => this.deleteSighting(x.sightingid)}>
                                    Delete Sighting
                                </button>
                            </div>
                    </div>
                    )
                }
        </>
        }else{
            return<><h3 className="text-center mt-2">All Sightings</h3>
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


}

export default ViewSightings;