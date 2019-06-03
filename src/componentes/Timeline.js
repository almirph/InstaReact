import React, { Component } from 'react';
import FotoIten from './FotoIten';


export default class Timeline extends Component {

  constructor (){
    super();
    this.state = {fotos:[]};
  }

  carregaFotos(props){
    let urlPerfil;

    if(props.login === undefined){
      urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/rafael`;  //fetch(`https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem("auth-token")}`)
    }
    else {
      urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${props.login}`;
    }
    
    fetch(urlPerfil)
    .then(response => response.json())
    .then(fotos => {
      this.setState({fotos:fotos});
    });

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.login !== undefined){
      console.log(nextProps);
      this.carregaFotos(nextProps);
    }
  }

  componentDidMount(){
    this.carregaFotos(this.props);
  }

  render(){
    return (
      <div className="fotos container">
        {
          this.state.fotos.map(foto => <FotoIten key={foto.id} foto={foto}/>)
        }
      </div>
      );
  }
}