import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import SimpleBottomNavigation from './components/mainNav';
import Movies from './Pages/Movies/movies';
import Search from './Pages/Search/search';
import Series from './Pages/Series/series';
import Trending from './Pages/Trending/Trending';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div className="app">
      <Container>
        <Switch>
          <Route path='/' component={Trending} exact/>
          <Route path='/movies' component={Movies}/>
          <Route path='/series' component={Series}/>
          <Route path='/search' component={Search}/>
        </Switch>
      </Container>
    </div>
    <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
