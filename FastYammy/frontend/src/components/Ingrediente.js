import React, { Component } from 'react';
import {ListGroupItem, Button} from 'react-bootstrap';

import "./Tweet.css";

export default class Ingrediente extends Component {

  handleRemoveStorage = e => {
    // e.preventDefault();
    const {ingrediente} = this.props;
    console.log(ingrediente);
    const ig = [];
          const str = localStorage.getItem('@select:ingredient');
          if(str !== null){
              const j = str.split(",");
              
              j.forEach(element => {
                  if(element !== ""){
                    if(element !== ingrediente){
                      // console.log(a);
                      ig.push(element);
                    }
                  }
              });
              console.log(ig);
              localStorage.setItem('@select:ingredient', ig);
              console.log(localStorage.getItem('@select:ingredient'));
          }
    };

  render() {
    const {ingrediente} = this.props;
    return (
        <ListGroupItem>
            <p>{ingrediente}  <Button bsStyle="danger" className="a" onClick={this.handleRemoveStorage}>X</Button></p>            
        </ListGroupItem>
    );
  }
}
