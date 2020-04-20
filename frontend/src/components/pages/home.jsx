import React, { Component } from 'react';
import '../../default.css';

//components
import LoginForm from '../formsComponent/loginForm.jsx';
import SafeGuide from '../pages/safeGuide.jsx';


class Home extends Component {
  render(){
      return (
          <div className="home text-center">  
            <div className = "align-middle">
                <LoginForm />
            </div>
          </div>
      
  );
  }
}

export default Home;
