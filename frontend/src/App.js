import React, { Component } from 'react';
import './default.css';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import LoginForm from './components/formsComponent/loginForm';
import SafeGuide from './components/pages/safeGuide';

class App extends Component {
  render(){
      return (
      <div className="App">   
      
        <Header myprop="kek"/>

        <SafeGuide />

        <LoginForm />

        <Footer />

      </div>
  );
  }
}

export default App;
