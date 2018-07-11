import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.JPG';
import './ManualSearch.css';
import './Login.css';
import ManualSearch from './ManualSearch'
import Home from './Home'
import { test } from './server.js'

console.log(test);


function newAccount() {
    ReactDOM.render(<NewUser />, document.getElementById('root'));
}

function goToHome() {
    ReactDOM.render(<Home />, document.getElementById('root'));
}


class NewUser extends Component {
    render() {
        return (
            <div className="ManualSearch">
                <header className="ManualSearch-header">
                    <img src={logo} className="ManualSearch-logo" alt="logo" />
                    <h1 className="ManualSearch-title">hillClimber</h1>
                </header>
                <form>
                    <input className="login-input" placeholder="username" />
                    <input className="login-input" placeholder="password" />
                    <input className="login-input" placeholder="confirm password" />
                    <button onClick={goToHome} className="login-submit">Create Account</button>
                </form>

            </div>
        );
    }
}

class Login extends Component {
    render() {
        return (
            <div className="ManualSearch">
                <header className="ManualSearch-header">
                    <img src={logo} className="ManualSearch-logo" alt="logo" />
                    <h1 className="ManualSearch-title">hillClimber</h1>
                </header>
                <form>
                    <input className="login-input" placeholder="username" />
                    <input className="login-input" placeholder="password" />
                    <button onClick={goToHome} className="login-submit">Login</button>
                </form>

                <p>Dont have an account? Click <a href='#' onClick={newAccount}>here</a>.</p>

            </div>
        );
    }
}

export default Login;
