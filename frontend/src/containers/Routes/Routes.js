import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';

import Home from '../../containers/Home';
import Login from '../../containers/Login';
import Upload from '../../containers/Upload';

class Routes extends Component {
   render() {
      return (
         <div>
           <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/Login' component={Login} />
              <Route exact path='/Upload' component={Upload} />
           </Switch>
         </div>
      );
   }
}
export default Routes;
