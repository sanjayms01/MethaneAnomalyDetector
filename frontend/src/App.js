import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './pages/home';
import Explore from './pages/explore';

class App extends React.Component {

    /**
     * Initialize
     */
    constructor(props) {
        super(props);
    }

    /**
     * Render components
     */
    render() {
        let props = this.props;

        return (
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route path="/explore" render={props => <Explore {...props} />} />
            </Switch>
          </BrowserRouter>
        );
    }
}

/**
 * Default export
 */
export default App;
