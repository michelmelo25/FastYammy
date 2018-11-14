import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Pesquisa from './pages/Pesquisa';
import Receitas from './pages/Resultados';
import Receita from './pages/Receita';

class App extends Component { 
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Pesquisa} />
          <Route path="/receitas" component={Receitas} />
          <Route path="/receita" component={Receita} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
