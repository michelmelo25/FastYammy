import React, { Component } from 'react';

import "./Resultado.css";

import {Col, Thumbnail} from 'react-bootstrap';

export default class Resultado extends Component {
    state = {
        receita: []
    }

    handleSubmit = async e => {
        e.preventDefault();
    
        const ig = this.props.resultado.receita;
        console.log(ig.receita);
        this.state.receita.push(this.props.resultado.receita);
        localStorage.setItem('@receita:', ig.receita);
    }

  render() {
    const { resultado } = this.props;

    return (
        <Col xs={6} md={4}>
            <div className="container" >
                <div className="card" onClick={this.handleSubmit}>
                    <Thumbnail src={resultado.receita.link_imagem} alt="imagem">
                        <h3>{resultado.receita.receita}</h3>
                    </Thumbnail>
                </div>
            </div>
        </Col>
    );
  }
}
