import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
      </BrowserRouter>
      <div className="App">
        <header className="App-header" />
      </div>

    </>
  );
}
// olá

export default App;
