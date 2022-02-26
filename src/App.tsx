import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.scss';
import Home from "./pages/home";

function App() {

  return (
      <BrowserRouter>
        <Route path="/:cityParam?">
          <Home/>
        </Route>
      </BrowserRouter>
  );
}

export default App;
