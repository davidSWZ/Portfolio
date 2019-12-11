import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import "../node_modules/jquery/dist/jquery.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/App.css';
import './styles/site.css';
import './styles/admin.css';
import './styles/fontawesome/css/all.css';
import Site from './components/site';
import Admin from './components/admin';
import Header from './components/header';

function App() {
  return (

    <Router>
      <Header />
      <Route path='/' exact component={Site} />
      <Route path='/admin' component={Admin} />
    </Router>
  );
}

export default App;
