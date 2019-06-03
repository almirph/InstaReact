import React, { Component } from 'react';
import {browserHistory} from 'react-router';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {login : '', msg : ''};
    }
    render(){
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalmir</h1>
                <form onSubmit={this.envia.bind(this)}>
                    <span>{this.state.msg}</span>
                    <input type="text" ref={(input) => this.login = input}/>
                    <input type="password" ref={(input) => this.senha = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }

    envia(event){
        event.preventDefault();
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({login:this.login.value,senha:this.senha.value}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };
        fetch('https://instalura-api.herokuapp.com/api/public/login',requestInfo)
            .then(response => {
                if(response.ok){
                    return response.text();
                } else {
                    throw new Error('não foi possível fazer o login');
                }
            })
            .then(token => {
                browserHistory.push('/timeline');
            })
            .catch(error =>{
                this.setState({msg:error.message})
            });
    }
}