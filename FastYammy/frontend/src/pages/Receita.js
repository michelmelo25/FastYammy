import React, { Component } from 'react';
import api from "../services/api";
// import Navbarr from "../components/Navbar";

import {Thumbnail, Grid, Row} from 'react-bootstrap';
import "./Receita.css";

import Logo from "./Logo-ls3.png";

export default class Receita extends Component {
  state = {
    receita: []
  }
  
   async componentDidMount() {
    if(!localStorage.getItem('@receita:')){
      this.props.history.push('/');
    }
    const nomer = localStorage.getItem('@receita:').split(",").toString(); 
    console.log(nomer);
    const receita = await api.post('receita', {nomer});
    console.log("--------RECEITA------");
    console.log(nomer);
    console.log(receita.data);
    this.setState({receita: receita.data});
  }

  render() {
    const  resultado = this.state.receita;
    const srt = resultado.ingredientes;
    // const I = srt.s
    console.log(srt);
    return (
     <div>
        {/* <Navbarr></Navbarr> */}
        <Grid>
          <Row>
          <div className="container" >
            <img src={Logo} alt='logo' className="img"/>
            <div className="card" >
            <Thumbnail src={resultado.link_imagem} alt="imagem" >
            </Thumbnail>
              <h3>{resultado.receita}</h3>
              <p><b>Ingredientes</b></p>
              <p>{resultado.ingredientes}</p>
              <p><b>Modo de Preparo</b></p>
              <p>{resultado.modoPreparo}</p>
            </div>
          </div>
        </Row></Grid>
     </div>
    );
  }
}
