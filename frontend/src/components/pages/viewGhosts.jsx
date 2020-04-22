import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditBio from '../formsComponent/editBio.jsx'

class ViewGhosts extends React.Component {
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
        axios.get('http://localhost:8000/api/private/ghosts/all',
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
                <h3 className="text-center mt-2">All Ghosts</h3>
                {
                    this.state.allGhosts.map((x,i) => 
                    <div className = "card m-3">
                        <div className = "card-body">
                            <h5 className = "card-title">
                                {x.name}
                            </h5>
                            <p className = "card-text">
                                {x.biography}
                            </p>
                            <div className = "text-right">
                                <Link to="/editbio">
                                    <button className = "btn btn-secondary">
                                        Edit Ghost Biography
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>)
                }
        </>

    }


}

export default ViewGhosts;