import React, { Component } from 'react';
import './default.css';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import LoginForm from './components/formsComponent/loginForm.jsx';
import SafeGuide from './components/pages/safeGuide.jsx';
import ReportSighting from './components/formsComponent/reportSighting.jsx';
import ProfileForm from './components/formsComponent/profileForm.jsx';

class App extends Component {
  render(){
      return (
      <div className="App">   
      
        <Header myprop="kek"/>

        <SafeGuide />

        <LoginForm />

        <ProfileForm />

        <ReportSighting />

        <Footer />

      </div>
  );
  }
}

export default App;
