import React, { Component } from 'react';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import SafeGuide from './components/pages/safeGuide.jsx';
import ReportSighting from './components/formsComponent/reportSighting.jsx';
import ProfileForm from './components/formsComponent/profileForm.jsx';
import Home from './components/pages/home.jsx';
import EditProfileForm from './components/formsComponent/editProfile.jsx';
import CreateGhost from './components/formsComponent/createGhost.jsx';
import ViewProfile from './components/pages/viewProfile';
import ViewLocation from './components/pages/viewLocation';
import ViewGhosts from './components/pages/viewGhosts.jsx'
import ViewSightings from './components/pages/viewSightings.jsx'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import EditBio from './components/formsComponent/editBio';
import MySightings from './components/pages/mySightings.jsx';
import EditSighting from './components/formsComponent/editSighting';

class App extends Component {
  render(){
      return (
        <Router>
            <Header/>

            <Switch>
              <Route path="/" exact component={Home} />

              <Route path="/editprofile/:id" component={EditProfileForm} />

              <Route path = "/mysightings/:id" component = {MySightings} />

              <Route path = "/editsighting/:id" component = {EditSighting} />

              <Route path="/reportsighting" component={ReportSighting} />

              <Route path="/register" component={ProfileForm} /> 

              <Route path ="/safeguide" component = {SafeGuide}/>

              <Route path = "/myprofile" component = {ViewProfile}/>

              <Route path = "/createghost" component = {CreateGhost} />

              <Route path = '/location/:locationid' component = {ViewLocation}/>

              <Route path = '/viewghosts' component = {ViewGhosts} />

              <Route path = '/viewsightings' component = {ViewSightings} />

              <Route path = '/editghostbio/:id' component = {EditBio} />
               
            </Switch>
            

            <Footer />

        </Router>
      
  );
  }
}

export default App;
