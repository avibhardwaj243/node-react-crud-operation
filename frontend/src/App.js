import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './containers/Routes/Routes';
import Header from './containers/Layout/Header';
import Footer from './containers/Layout/Footer';

class App extends Component {
   render() {
      return (
         <Router>
            <div>
              <Header />
              <Routes />
              <Footer />
            </div>
         </Router>
      );
   }
}
export default App;
