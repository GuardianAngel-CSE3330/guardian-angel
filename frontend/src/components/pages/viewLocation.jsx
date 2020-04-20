import React from 'react';
//TODO emulate other pages

export default class viewLocation extends React.Component {

    config = {
        headers: {
            Authorization: 'Bearer '
        }
    }

    state = {

    }

    async createAuthToken() {
        var profileToken = await localStorage.getItem('bearer_token');
        console.log('|' + profileToken + '|');
        this.config.headers.Authorization = this.config.headers.Authorization.concat(profileToken);
    }

    async componentDidMount() {
        
    }


}