import React from 'react';
import axios from 'axios';
import parseJwt from '../parsejwt';

class ReportSighting extends React.Component {

    
    months = [0,1,2,3,4,5,6,7,8,9,10,11];
    days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
    spookienessLevel = [1,2,3,4,5];
    allGhosts = [];
    state = {
        reporterid: '', 
        ghostid: '',
        month: '',
        year: '',
        day: '',
        location: '',
        title: '',
        description: '',
        imageurl: '',
        spookiness: ''
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
        var token = this.config.headers.Authorization.substring(7); //substring 7 to remove "Bearer " from token
        //get details from decoding id token
        var params = parseJwt(token);
        console.log(JSON.stringify(this.config));
        this.setState({reporterid: params.id});
        await axios.get('http://localhost:8000/api/private/ghosts/all',
        this.config
        ).then(res => {
            //Once you get the bearer token --> store it in local storage
            console.log(res);

            this.allGhosts = [...res.data];
            console.log("all ghosts");
            console.log("All ghosts " + this.allGhosts.map((x) => x.ghostid));
            }   
        ).catch((e) => {
            alert(e)
        });
    }
    

    createSighting(){
        axios.put('http://localhost:8000/api/private/sightings/create',
        this.state,
        this.config
        ).then(res => {
            //Once you get the bearer token --> store it in local storage
            console.log(res)
            alert("Sighting Submitted!");
            }   
        ).catch((e) => {
            alert(e)
        });
        var frm = document.getElementsByName('sighting-form')[0];
        frm.reset();
        this.setStatestate = {
            reporterid: '', 
            ghostid: '',
            month: '',
            year: '',
            day: '',
            location: '',
            title: '',
            description: '',
            imageurl: '',
            spookiness: ''
        }
        return false;
    }
    getGhostID(ghostName){
        this.allGhosts.map((x) => {
            if(x.name === ghostName){
                console.log(x.ghostid);
                return x.ghostid;
            }
        })
    }
    
    handleChangeMonth(event){
        this.setState({month: event.target.value-1});
    }
    handleChangeDay(event){
        this.setState({day: event.target.value});
    }
    handleChangeYear(event){
        this.setState({year: event.target.value});
    }
    handleChangeGhostTitle(event){
        this.setState({title: event.target.value});
    }
    handleChangeLocation(event){
        this.setState({location: event.target.value});
    }
    handleChangeGhostImage(event){
        this.setState({imageurl: event.target.value});
    }
    handleChangeDescription(event){
        this.setState({description: event.target.value});
    }
    handleChangeSpookiness(event){
        this.setState({spookiness: event.target.value});
    }
    handleChangeGhostID(event){
        this.allGhosts.map((x) => {
            if(x.name === event.target.value){
                this.setState({ghostid: x.ghostid})
                console.log(x.ghostid);
            }
        })
    }


    render() {
        return <>
        <div className ="text-center">
            <div className = "block-example border border-dark m-2">
                    <form name ="sighting-form" className="justify-content-center align-items-center">
                        <h1 className = "formTitle">Report A Ghost Sighting</h1>

                        <div className="form-group">
                            <label htmlFor="sightingTitle">Sighting Title*</label>
                            <input type="text"
                                id="sightingTitle"
                                name="sightingTitle"
                                className="form-control"
                                placeholder = "Sighting Title"
                                onChange = {e => this.handleChangeGhostTitle(e)}
                                required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location of Sighting*</label>
                            <input type="text"
                                id="location"
                                name="location"
                                className="form-control"
                                placeholder = "Location of Sighting"
                                onChange = {e => this.handleChangeLocation(e)}
                                required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateSighted">Date of Sighting*</label>
                            <div className = "container align-items-center">
                                <div className = "row align-items-center">
                                    <div className = "col">
                                        <select id="month" name="month"
                                        onChange = {e => this.handleChangeMonth(e)}
                                        required>
                                            <option></option>
                                            {
                                            this.months.map((x,i) => <option key = {i}> { x + 1}</option>)
                                            }
                                        </select>
                                    </div>

                                    <div className = "col">
                                        <select id="day" name="day"
                                        onChange = {e => this.handleChangeDay(e)}
                                        required>
                                            <option></option>
                                            {
                                            this.days.map((x,i) => <option key = {i}> { x }</option>)
                                            }
                                        </select>
                                    </div>

                                    <div className = "col">
                                        <select id="year" name="year"
                                        onChange = {e => this.handleChangeYear(e)}
                                        required>
                                            <option></option>
                                            {
                                            this.years.map((x,i) => <option key = {i}> { x }</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="sightingDesc">Description of Ghost*</label>
                            <input type = "text"
                                id="sightingDesc"
                                name="sightingDesc"
                                placeholder = "Description of Ghost"
                                className="form-control"
                                onChange = {e => this.handleChangeDescription(e)}
                                />
                        </div>
                        

                        <div className="form-group">
                            <label htmlFor="ghostPhoto">URL of Ghost Image: </label>
                            <input type = "text"
                                id="ghostPhoto"
                                name="ghostPhoto"
                                className="form-control-photo" 
                                placeholder = "URL"
                                onChange = {e => this.handleChangeGhostImage(e)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ghostRating">Spookiness Level</label>
                                <br></br>
                                <select id="spookieness" name="spookiness"
                                onChange = {e => this.handleChangeSpookiness(e)}
                                required>
                                    <option></option>
                                    {
                                    this.spookienessLevel.map((x,i) => <option key = {i}> { x }</option>)
                                    }
                                </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ghostName">Ghost's Name</label>
                                <br></br>
                                <select id="ghostName" name="ghostName"
                                onChange = {e => this.handleChangeGhostID(e)}
                                required>
                                    {
                                    this.allGhosts.map((x,i) => <option value={i.ghostid}>{x.name}</option>)
                                    }
                                </select>
                        </div>
                    </form>
                    <button type = "submit" 
                        className = "btn btn-primary"
                        onClick= {e => this.createSighting()}>
                            Submit Sighting
                    </button>

            </div>
        </div>
        </>;
    }
}

export default ReportSighting;