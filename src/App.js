import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Route exact path="/" component={Home}/>
      </BrowserRouter>
  );
}

export default App;
