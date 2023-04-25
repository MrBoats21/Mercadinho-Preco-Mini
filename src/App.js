import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Details from './pages/Details';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Home } />
      <Route path="/Cart" component={ Cart } />
      <Route path="/details/:id" component={ Details } />
    </BrowserRouter>
  );
}
// olá

export default App;
