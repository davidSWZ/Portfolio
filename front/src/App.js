import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
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
