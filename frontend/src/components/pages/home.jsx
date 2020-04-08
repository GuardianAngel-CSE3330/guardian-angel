import React, { Component } from 'react';
import '../../default.css';

//components
import LoginForm from '../formsComponent/loginForm.jsx';
import SafeGuide from '../pages/safeGuide.jsx';


class Home extends Component {
  render(){
      return (
          <div className="home text-center">   
            <div className = "container">
                <div className = "row">
                    <div className = "col-6">
                        <SafeGuide />
                    </div>

                    <div className = "col-6 mt-2">
                        <LoginForm />
                    </div>
                </div>
            </div>

          </div>
      
  );
  }
}

export default Home;
