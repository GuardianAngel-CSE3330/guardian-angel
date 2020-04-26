import React from 'react';

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
        <div className="home text-center mt-2">   
            <div className = "container">
                <LoginForm />
            </div>
        </div>
          
      )
    } else {
        return (
            <div className="home text-center">   
                <div className = "container">
                    <SafeGuide />
                </div>
            </div>
        )
    };
  }
}

export default Home;