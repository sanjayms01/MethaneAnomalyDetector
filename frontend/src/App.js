import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
            <div>
              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/explore" element={<Explore />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        );
    }
}

/**
 * Default export
 */
export default App;
