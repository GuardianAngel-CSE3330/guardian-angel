import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component{
    state = {
        email: '',
        password: ''
    }

    loginWithCredentials() {
        axios.post(`http://localhost:8000/api/public/users/login`, 
        this.state)
        .then(res => {
            console.log(res);
            }
        )
        //Once you get the bearer token --> store it in local storage
    }


    handleChangeUser(event) {
        this.setState({email: event.target.value});
    }
    handleChangePW(event) {
        this.setState({password: event.target.value});
    }

    render(){
        return(
            <div className = "container">
                <div className = "row">
                    <div className = "col-6">
                        <section className = "block-example border border-dark">
                            <input type="text" placeholder="Search.."></input>
                            <hr></hr>
                            <input type="radio" id="locSearch" 
                            name="searchType" value="locSearch"></input>
                                <label htmlFor="locSearch">By Location:  </label>

                            <input type="radio" id="ghoSearch" 
                            name="searchType" value="ghoSearch"></input>
                                <label htmlFor="locSearch">By Ghost:  </label>

                            <input type="radio" id="sigSearch" 
                            name="searchType" value="sigSearch"></input>
                                <label htmlFor="locSearch">By Sighting:  </label>
                        </section>
                        <section className = "block-example border border-dark">
                            <p>
                                SAFEGUIDE TO DO

                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a
                                n unknown printer took a galley of type and scrambled it to make a type specimen book. It 
                                has survived not only five centuries, but also the leap into electronic typesetting, remaining es
                                sentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L
                                orem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ver
                                sions of Lorem Ipsum.
                            </p>
                            <p>
                            
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a
                                n unknown printer took a galley of type and scrambled it to make a type specimen book. It 
                                has survived not only five centuries, but also the leap into electronic typesetting, remaining es
                                sentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L
                                orem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ver
                                sions of Lorem Ipsum.
                            </p>
                            <p>
                            
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a
                                n unknown printer took a galley of type and scrambled it to make a type specimen book. It 
                                has survived not only five centuries, but also the leap into electronic typesetting, remaining es
                                sentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L
                                orem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ver
                                sions of Lorem Ipsum.
                            </p>
                        </section>
                    </div>

                    <div className = "col-6">
                        <form className = "block-example border border-dark">
                            <h2 className ="signUp">Login</h2>
                            <div className = "form-group">
                                <label htmlFor = "email">Email Address:</label>
                                <input type = "email" className = "form-control"
                                    name = "email" 
                                    onChange={e => this.handleChangeUser(e)}/>
                            </div>
                            <div className = "form-group">
                                <label htmlFor = "password">Password:</label>
                                <input type = "password" className = "form-control"
                                    name = "password" 
                                    onChange={e => this.handleChangePW(e)}/>
                            </div> 

                            <button type="button" className = "btn btn-primary col-3" onClick={e => this.loginWithCredentials()}>
                                Login
                            </button>
                            <Link to="/profile"><button className = "btn btn-secondary col-3">Register</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginForm;