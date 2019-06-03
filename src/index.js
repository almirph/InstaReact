import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './componentes/Login';
import {Router,Route,browserHistory} from 'react-router';
import auth0 from 'auth0-js';
import Callback from './componentes/Callback'

/*
Parte de autenticação do alura que até o momento não está funcionando com a api Heroku

function verificaAutenticacao(nextState,replace) {
    if(localStorage.getItem('auth-token') === null){
        replace('/');
    }
}
*/

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth0.handleAuthentication();
        replace('/');
    }
}

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={Login}/>
            <Route path="/timeline(/:login)" component={App} />
            <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
            }}>
            </Route> 
        </Router>
    ),
    document.getElementById('root')
);