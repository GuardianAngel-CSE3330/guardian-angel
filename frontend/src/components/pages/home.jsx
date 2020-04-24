import React from 'react';
import '../../default.css';

//components
import LoginForm from '../formsComponent/loginForm.jsx';
import SafeGuide from '../pages/safeGuide.jsx';


class Home extends React.Component {

    state = {
        authTokenCreated: false
    }

  render(){
      if (!("bearer_token" in localStorage)) {
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
      )
    } else {
        return (
            <div className="home text-center">   
            <div className = "container">
                <div className = "row">
                    <div className = "col-8">
                        <SafeGuide />
                    </div>

                    <div className = "col-3 mt-2 card">
                        <h2 className="card-title">Login:</h2>
                        <div className="card-body border-primary">Already Logged in!</div>
                        
                    </div>
                </div>
            </div>

          </div>
        )
    };
  }
}

export default Home;