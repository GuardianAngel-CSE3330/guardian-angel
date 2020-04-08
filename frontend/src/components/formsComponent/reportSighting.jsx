import React from 'react';
class ReportSighting extends React.Component {
    render() {
        return <>
        <div className ="text-center">
            <div className = "block-example border border-dark">
                    <form className="justify-content-center align-items-center">
                        <h1 className = "formTitle">Report A Ghost Sighting</h1>

                        <div className="form-group">
                            <label htmlFor="sightingTitle">Sighting Title*</label>
                            <input type="text"
                                id="sightingTitle"
                                name="sightingTitle"
                                className="form-control"
                                required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location of Sighting*</label>
                            <input type="text"
                                id="location"
                                name="location"
                                className="form-control"
                                required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateSighted">Date of Sighting*</label>
                            <input type="date"
                                id="dateSighted"
                                name="dateSighted"
                                className="form-control"
                                required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="timeSighted">Time of Sighting*</label>
                            <input type="time"
                                id="timeSighted"
                                name="timeSighted"
                                className="form-control"
                                required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="sightingDesc">Sighting Description</label>
                            <input type = "text"
                                id="sightingDesc"
                                name="sightingDesc"
                                className="form-control"/>
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
                                className="form-control-photo" />
                        </div>

                        <button type = "submit" className = "btn btn-primary">
                            Submit Sighting
                        </button>
                    </form>
            </div>
        </div>
        </>;
    }
}

export default ReportSighting;