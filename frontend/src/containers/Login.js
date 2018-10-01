import React, { Component } from 'react';
import '../App.css';
import constant from '../Environment/Constants.js';
import request from 'request';
import auth from 'auth';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember:''
        };
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginSubmit(ev) {
        ev.preventDefault();
        const info = {
            username: this.state.username,
            password: this.state.password,
            remember: this.state.remember
        }
        //const data = new FormData();
        var data = [];
        data.push('username', info.username);
        data.push('password', info.password);
        data.push('remember', info.remember);
        
        const requestURL = constant.BACKEND_URL + 'user/login';
        fetch(requestURL, {
            method: 'POST',
            body: data
        }).then((response) => {
            //console.log(response);
            //auth.setToken(response.jwt, body.rememberMe);
            //auth.setUserInfo(response.user, body.rememberMe);
            //this.redirectUser();
        }).catch((err) => {
            console.log(err);
        });
    }

    redirectUser = () => {
        this.props.history.push('/');
    }

   render() {
      return (
         <div>
            <div className="App">
                    <h1 className="display-3">Login</h1>
                    <form onSubmit={this.handleLoginSubmit}>
                            <div className="form-element"><label>User Name</label>
                                <input name="username" value={this.state.username} type="text" onChange={e => this.handleChange(e)} placeholder="Enter the username" />
                            </div>
                            <br />
                            <div className="form-element"><label>Password</label>
                                <input name="password" value={this.state.password} type="password" onChange={e => this.handleChange(e)} placeholder="Enter the password" />
                            </div>
                            <br />
                            <div className="form-element">
                                <input name="remember" onChange={e => this.handleChange(e)} type="checkbox" /><label>Remember Me</label>
                            </div>
                            <div className="form-element">
                                    <button className="btn btn-success">Login</button>
                            </div>
                            <hr />
                            <p>Uploaded Image:</p>
                    </form>
            </div>
         </div>
      );
   }
}
export default Login;
