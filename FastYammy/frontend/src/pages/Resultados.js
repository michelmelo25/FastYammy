import React, { Component } from 'react';
import api from "../services/api";
import Resultado from "../components/Resultado";
// import Navbarr from "../components/Navbar";

import {Grid, Row} from 'react-bootstrap';

import Logo from "./Logo-ls3.png";
import './Login.css';

export default class Resultados extends Component {
  state = {
    receitas: []
  };

  async componentDidMount() {
    if(!localStorage.getItem('@select:ingredient')){
      this.props.history.push('/');
    }
    const ig = [];
        const str = localStorage.getItem('@select:ingredient');
        if(str !== null){
            const j = str.split(",");
            
            j.forEach(element => {
                if(element !== ""){
                  var a = {"nome": element};
                  console.log(a);
                    ig.push(a);
                }
            });
        }
        console.log('ig');
        console.log(ig);
        const response = await api.post('receitas', {ig});
        console.log('response');
        const r = response.data;
        console.log(r);

        this.setState({receitas: response.data});
        localStorage.setItem('@select:ingredient', "");
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push('/receita');
  }

  render() {
    return (
        <div>
          {/* <Navbarr></Navbarr> */}
          <div className='login-wrapper'>
            <img src={Logo} alt='logo' className="img"/>
            <Grid>
              <Row onClick={this.handleSubmit}>
                {this.state.receitas.map(rec => (
                  <Resultado key={rec.receita.receita} resultado={rec}  />
                ))}
              </Row>
            </Grid>
          </div>
        </div>
    );
  }
}
