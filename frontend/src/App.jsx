import React, { Component } from 'react';
import './default.css';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import LoginForm from './components/formsComponent/loginForm.jsx';
import SafeGuide from './components/pages/safeGuide.jsx';
import ReportSighting from './components/formsComponent/reportSighting.jsx';
import ProfileForm from './components/formsComponent/profileForm.jsx';
import Home from './components/pages/home.jsx';
import EditProfileForm from './components/formsComponent/editProfile.jsx'


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  render(){
      return (
        <Router>
          <div className="App">   
      
            <Header/>

            <Switch>
              <Route path="/" exact component={Home} />

              <Route path="/profile" component={EditProfileForm} />

              <Route path="/reportsighting" component={ReportSighting} />

              <Route path="/register" component={ProfileForm} /> 

              <Route path ="/safeguide" component = {SafeGuide}/>
               
            </Switch>
            

            <Footer />

          </div>
        </Router>
      
  );
  }
}

export default App;
