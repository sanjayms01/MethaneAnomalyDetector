import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
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
            <div>
                <Route exact path="/" render={props => <Explore {...props} />} />
                <Route exact path="/explore" render={props => <Explore {...props} />} />
            </div>
          </BrowserRouter>
        );
    }
}

/**
 * Default export
 */
export default App;