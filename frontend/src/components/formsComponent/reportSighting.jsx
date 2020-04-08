import React from 'react';
import axios from 'axios';
class ReportSighting extends React.Component {
    state = {
        reporterid: '', //Do I handle ID or does the back end
        reportername: '',
        reporteremail: '',
        ghostid: '',
        ghostname: '',//Who handles IDs
        month: '',
        year: '',
        day: '',
        location: '',
        title: '',
        imageurl: ''
    }

    createSighting(){
        axios.post('http://localhost:8000/api/private/sightings/create',
        this.state)
        .then (res => {
            console.log(res);
            }
        )
    }
    //ReporterID
    /*
    handleChangeFirstName(event){
        this.setState({firstname: event.target.value});
    } 
    handleChangeLastName(event){
        this.setState({lastname: event.target.value});
    }
    */
    handleChangeEmail(event){
        this.setState({reporteremail: event.target.value});
    }
    //GhostID
    handleChangeGhostName(event){
        this.setState({ghostname: event.target.value});
    }
    handleChangeDate(event){
        this.setState({month: event.target.value.getMonth()});
        this.setState({year: event.target.value.getFullYear()});
        this.setState({day: event.target.value.getDate()});
    }
    handleChangeLocation(event){
        this.setState({ghostname: event.target.value});
    }
    handleChangeGhostTitle(event){
        this.setState({title: event.target.value});
    }
    handleChangeGhostImage(event){
        this.setState({imageurl: event.target.value});
    }

    render() {
        return <>
        <div className ="text-center">
            <div className = "block-example border border-dark m-2">
                    <form className="justify-content-center align-items-center">
                        <h1 className = "formTitle">Report A Ghost Sighting</h1>

                        <div className="form-group">
                            <label htmlFor="sightingTitle">Sighting Title*</label>
                            <input type="text"
                                id="sightingTitle"
                                name="sightingTitle"
                                className="form-control"
                                onChange = {e => this.handleChangeGhostTitle(e)}
                                required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location of Sighting*</label>
                            <input type="text"
                                id="location"
                                name="location"
                                className="form-control"
                                onChange = {e => this.handleChangeLocation(e)}
                                required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateSighted">Date of Sighting*</label>
                            <input type="date"
                                id="dateSighted"
                                name="dateSighted"
                                className="form-control"
                                onChange = {e => this.handleChangeDate(e)}
                                required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="sightingDesc">Sighting Description</label>
                            <input type = "text"
                                id="sightingDesc"
                                name="sightingDesc"
                                className="form-control"
                                />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ghostBio">Ghost Biography</label>
                            <input type = "text"
                                id="ghostBio"
                                name="ghostBio"
                                className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ghostPhoto">Photo of Sighting: </label>
                            <input type = "file"
                                id="ghostPhoto"
                                name="ghostPhoto"
                                className="form-control-photo" 
                                onChange = {e => this.handleChangeGhostImage(e)}/>
                        </div>

                        <button type = "submit" 
                        className = "btn btn-primary"
                        onClick={e => this.createSighting()}>
                            Submit Sighting
                        </button>
                    </form>
            </div>
        </div>
        </>;
    }
}

export default ReportSighting;