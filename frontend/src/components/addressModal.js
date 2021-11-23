import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import SearchBox from "./searchBox";
import SearchSelection from './searchSelection';
import Radio from '@material-ui/core/Radio';
import { RadioGroup, FormControlLabel, FormControl } from '@material-ui/core';

class AddressModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {radioValue, selectedOption, showModal, validAddress} = this.props;
        let {handleRadioValue, handleSelect, handleTextChange, handleClose} = this.props;   

        return (
            <div>
                <Modal
                    show = {showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Search Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="unit" name="unit" value={radioValue} style={{justifyContent: 'center'}} onChange={handleRadioValue}>
                                    <FormControlLabel value="custom" control={<Radio />} label="Custom" />
                                    <FormControlLabel value="zone" control={<Radio />} label="Zone" />
                                </RadioGroup>
                            </FormControl>

                            {
                                radioValue == 'zone' ? (
                                <SearchSelection
                                    {...this.props}
                                    selectedOption = {selectedOption}
                                    handleSelect = {handleSelect}
                                />) : (
                                <SearchBox
                                    {...this.props}
                                    handleTextChange = {handleTextChange}
                                    handleSelect = {handleSelect}
                                />)
                            }
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
                        <Button variant="primary" onClick={handleClose}>Search</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default AddressModal;
