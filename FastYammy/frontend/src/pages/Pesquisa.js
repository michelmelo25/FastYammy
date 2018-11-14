import React, { Component } from 'react';
// import api from '../services/api';

import Logo from "./Logo-ls3.png";
import './Login.css';
import Ingredient from "../components/Ingrediente";
// import Navbarr from "../components/Navbar";
import {ListGroup, Button} from 'react-bootstrap';

export default class Pesquisa extends Component {
    state = {
        select: [],
        newIngrediente: ""
    };

    componentDidMount(){
        localStorage.setItem('@receita:', "");
        const response = [];
        const str = localStorage.getItem('@select:ingredient');
        if(str !== null){
            const j = str.split(",");
            
            j.forEach(element => {
                if(element !== ""){
                    response.push(element);
                }
            });
        }

        this.setState({select: response});
    }

    handleNewIngredient = e => {
        if (e.keyCode !== 13) return;

        const content = this.state.newIngrediente;
        const temp = [];
        const v = localStorage.getItem('@select:ingredient');
        temp.push(v);
        temp.push(content);
        localStorage.setItem('@select:ingredient', temp);
        
        this.setState({ newIngrediente: "" });
        this.setState({ select: temp})
        console.log(temp);
    }

    hasndleImputCharge = e => {
        this.setState({ newIngrediente: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();

        const ig = this.state.select;

        if(!ig.length) return;
        console.log("redirect");
        console.log(ig);
        this.props.history.push('/receitas');
    };

  render() {
    return (
        // timeline-wrapper
        <div>
            {/* <Navbarr></Navbarr> */}
            <div className='login-wrapper'>
        <img src={Logo} alt='logo' className="img"/>
           <form >              
           <input
            placeholder="ingredientes"
            value={this.state.newIngrediente}
            onChange={this.hasndleImputCharge}
            onKeyDown={this.handleNewIngredient}
           />
           </form>
           <form>
           <ListGroup>
                { this.state.select.map(ingredient => (
                    <Ingredient key={ingredient} ingrediente={ingredient} />
                )) }    
            </ListGroup> 
            <br/>
           <Button bsStyle="info" onClick={this.handleSubmit}>Pesquisa</Button>
           </form>
           <br/>
           <br/>
           {/* onSubmit={this.handleSubmit} */}

           
        </div>
        </div>
    );
    
  }
}
