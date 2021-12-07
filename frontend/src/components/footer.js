import React, { Component } from 'react'
export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <footer id="footer" style={{top: 0}}>
                <div className="container">
                <div className="copyright">
                    &copy; Copyright <strong><span>Anyar</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                    {/* <!-- All the links in the footer should remain intact. --> */}
                    {/* <!-- You can delete the links only if you purchased the pro version. --> */}
                    {/* <!-- Licensing information: https://bootstrapmade.com/license/ --> */}
                    {/* <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/anyar-free-multipurpose-one-page-bootstrap-theme/ --> */}
                    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
                </div>
            </footer>
        );
    }
}