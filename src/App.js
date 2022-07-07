import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Cart from './pages/Cart';

import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Home } />
      <Route exact path="/Cart" component={ Cart } />
    </BrowserRouter>
  );
}
// olá

export default App;
