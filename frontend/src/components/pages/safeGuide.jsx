import React, { Component } from 'react';
import axios from 'axios';

class SafeGuide extends Component {
    state = {
        allGhosts: []
    }
    testGhosts = [];
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
        await this.createAuthToken();
        console.log("Created token");
        console.log(JSON.stringify(this.config));
        await axios.get(`http://localhost:8000/api/private/ghosts/all`, this.config)
        .then((res) => {
            console.log(res);
        }
        )
        .catch(e =>
            alert("Error")
        )
    }

    render(){
        return (
            <div>
                <div className = "block-example border border-dark m-2">
                    <input type="text" placeholder="Search.."></input>
                    <hr></hr>
                    <input type="radio" id="locSearch" 
                    name="searchType" value="locSearch"></input>
                        <label htmlFor="locSearch">By Location:  </label>

                    <input type="radio" id="ghoSearch" 
                    name="searchType" value="ghoSearch"></input>
                        <label htmlFor="locSearch">By Ghost:  </label>

                    <input type="radio" id="sigSearch" 
                    name="searchType" value="sigSearch"></input>
                        <label htmlFor="locSearch">By Sighting:  </label>
                    </div>


                    <div className = "block-example border border-dark m-2">
                    </div>

                    
                    
                </div>
    );
    }
}

export default SafeGuide;