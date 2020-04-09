import React from 'react';
import axios from 'axios';
class ReportSighting extends React.Component {
    
    months = [0,1,2,3,4,5,6,7,8,9,10,11];
    days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
    state = {
        reporterid: '', //Do I handle ID or does the back end
        reporterfirstname: '',
        reporterlasttname: '',
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
        );
        this.setState({
            reporterid: '', //Do I handle ID or does the back end
            reporterfirstname: '',
            reporterlasttname: '',
            reporteremail: '',
            ghostid: '',
            ghostname: '',//Who handles IDs
            month: '',
            year: '',
            day: '',
            location: '',
            title: '',
            imageurl: ''
        });
    }
    //ReporterID
    
    handleChangeFirstName(event){
        this.setState({firstname: event.target.value});
    } 
    handleChangeLastName(event){
        this.setState({lastname: event.target.value});
    }
    
    handleChangeEmail(event){
        this.setState({reporteremail: event.target.value});
    }
    //GhostID
    handleChangeGhostName(event){
        this.setState({ghostname: event.target.value});
    }
    
    handleChangeMonth(event){
        this.setState({month: event.target.value});
    }

    handleChangeDay(event){
        this.setState({day: event.target.value});
    }

    handleChangeYear(event){
        this.setState({year: event.target.value});
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
                            <label htmlFor="ghostname">Name of Ghost*</label>
                            <input type="text"
                                id="sightingTitle"
                                name="sightingTitle"
                                className="form-control"
                                onChange = {e => this.handleChangeGhostName(e)}
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
                                        <select id="day" name="day"
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

                        {/*
                        <div className="form-group">
                            <label htmlFor="sightingDesc">Sighting Description</label>
                            <input type = "text"
                                id="sightingDesc"
                                name="sightingDesc"
                                className="form-control"
                                />
                        </div>
                        */}
                        
                        {/* 
                        <div className="form-group">
                            <label htmlFor="ghostBio">Ghost Biography</label>
                            <input type = "text"
                                id="ghostBio"
                                name="ghostBio"
                                className="form-control"/>
                        </div>
                        */}

                        <div className="form-group">
                            <label htmlFor="ghostPhoto">Photo of URL: </label>
                            <input type = "text"
                                id="ghostPhoto"
                                name="ghostPhoto"
                                className="form-control-photo" 
                                onChange = {e => this.handleChangeGhostImage(e)}/>
                        </div>

                       
                    </form>
                    <button type = "submit" 
                        className = "btn btn-primary"
                        onClick={e => this.createSighting()}>
                            Submit Sighting
                    </button>
            </div>
        </div>
        </>;
    }
}

export default ReportSighting;