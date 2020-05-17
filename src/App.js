import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Form from "./Form";
import Home from "./Home";



function App () {
  return (

    <Router>

      <nav className="navbar">
        <Link to="/">
          <button name='homebutton'>Home</button>
        </Link>

      </nav>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
    </>
  );
};
export default App;
