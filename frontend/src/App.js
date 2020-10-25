import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from './components/Navbar.component';
import Product from './components/Product.component';

// import 'jquery/dist'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
      </div>

      <Route path="/products" exact component={Product} />
    </Router>
  );
}

export default App;
