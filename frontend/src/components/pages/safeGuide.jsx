import React, { Component } from 'react';
import axios from 'axios';

class SafeGuide extends Component {

    config = {
        headers: {
            Authorization: 'Bearer '
        }
    }

    state = {

    }


    async handleButtonPress(){
        if (localStorage.getItem('bearer_token')) {
            await this.createAuthToken();
        } else {
            alert("Please log in before searching the database!");
            return;
        }


        if (!this.state.type) {
            alert("Please pick a search parameter!")
        }
        else if (this.state.type === 'location') {
            //await axios call
        }
        else if (this.state.type === 'ghost') {
            //await axios call
        }
        else if (this.state.type === 'sighting') {
            //await axios call
        }
    }


    async createAuthToken() {
        var profileToken = await localStorage.getItem('bearer_token');
        console.log('|' + profileToken + '|');
        this.config.headers.Authorization = this.config.headers.Authorization.concat(profileToken);
    }

    render(){
        return (
            <div>
                <div className = "block-example border border-dark m-2">
                    <input type="text" placeholder="Search.."></input>
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
                        <p>
                            SAFEGUIDE TO DO

                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a
                            n unknown printer took a galley of type and scrambled it to make a type specimen book. It 
                            has survived not only five centuries, but also the leap into electronic typesetting, remaining es
                            sentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L
                            orem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ver
                            sions of Lorem Ipsum.
                        </p>
                        <p>
                        
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a
                            n unknown printer took a galley of type and scrambled it to make a type specimen book. It 
                            has survived not only five centuries, but also the leap into electronic typesetting, remaining es
                            sentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L
                            orem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ver
                            sions of Lorem Ipsum.
                        </p>
                        <p>
                        
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a
                            n unknown printer took a galley of type and scrambled it to make a type specimen book. It 
                            has survived not only five centuries, but also the leap into electronic typesetting, remaining es
                            sentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L
                            orem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ver
                            sions of Lorem Ipsum.
                        </p>
                    </div>
                </div>
    );
    }
}

export default SafeGuide;