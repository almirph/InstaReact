import React, { Component } from 'react';
import {Link} from 'react-router';

class FotoAtualizacoes extends Component {

  like(event){
    event.preventDefault();
    fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, {method: "POST"})
    .then(response => {
      if(response.ok) {
          return response.json();
      } else {
          throw new Error("não foi possível realizar o like da foto");
      }
  })
}

  render(){

    return (
        <section className="fotoAtualizacoes">

        <a onClick={this.like.bind(this)} className="fotoAtualizacoes-like">Linkar</a>
        <form className="fotoAtualizacoes-form">
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
        </form>

      </section>              
        );
    }
}

class FotoInfo extends Component {
    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">

                {
                    this.props.foto.likers.map(liker => {
                    return <Link key={liker.login} to={`/timeline/${liker.login}`} login={liker.login}>{liker.login},</Link>
                  })
                }

                curtiram

              </div>

              <ul className="foto-info-comentarios">
              {
                      this.props.foto.comentarios.map(comentario => {
                          return (
                              <li className="comentario" key={comentario.id}>
                                  <Link  to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login}</Link>
                                  : {comentario.texto}
                              </li>
                          );
                      })
              }
              </ul>

            </div>            
        );
    }
}

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  
                  <Link to={`/timeline?${this.props.foto.loginUsuario}`}>
                    {this.props.foto.loginUsuario}
                  </Link>  
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.fotoUsuario}</time>
            </header>            
        );
    }
}

export default class FotoIten extends Component {
    render(){
        return (
          <div className="foto">
            <FotoHeader foto={this.props.foto}/>
            <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
            <FotoInfo foto={this.props.foto}/>
            <FotoAtualizacoes foto={this.props.foto}/>
          </div>            
        );
    }
}