import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import SearchBox from "./searchBox";
import Radio from '@material-ui/core/Radio';
import { RadioGroup, FormControlLabel, FormControl } from '@material-ui/core';

class AddressModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {radioValue, showModal, validAddress} = this.props;
        let {handleRadioValue, handleSelect, handleTextChange, handleClose} = this.props;   

        return (
            <div>
                <Modal
                    show = {showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header style={{display: 'flex', justifyContent: 'center'}}>
                        <Modal.Title id="contained-modal-title-vcenter">Search Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                            <SearchBox
                                {...this.props}
                                handleTextChange = {handleTextChange}
                                handleSelect = {handleSelect}
                            />
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="unit" name="unit" value={radioValue} style={{justifyContent: 'center'}} onChange={handleRadioValue}>
                                    <FormControlLabel value="Zone" control={<Radio />} label="Climate Zone" />
                                    <FormControlLabel value="Neighborhood" control={<Radio />} label="Neighborhood" />
                                </RadioGroup>
                            </FormControl>
                            <hr />
                            <p><b>Climate Zone:</b> Anomalies detected at the climate zone level</p>
                            <p><b>Neighborhood:</b> Anomalies detected at around the surrounding area (+/- 35 mile range)</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            validAddress == false ? (
                                <h5 style={{color: 'red'}}>Not a California address. Please try again.</h5>
                            ) : (
                                <div />
                            )
                        }
                        <Button variant="secondary"><Link to='/' style={{color: 'white'}}>Close</Link></Button>
                        <Button variant="primary" onClick={handleClose} style={{backgroundColor: "#11694E"}}>Search</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default AddressModal;
