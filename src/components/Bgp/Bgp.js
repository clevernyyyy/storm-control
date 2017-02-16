import React, { Component } from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap'
import axios from 'axios';

import './Bgp.css';
import Prefixes from './Prefixes/Prefixes';

export default class Bgp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bgp: '',
            holder: '',
            geoData: {}
        }
        this.handleChangeBgp = this.handleChangeBgp.bind(this);
        this.getBgpData = this.getBgpData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    getValidationStateBgp() {
        if (this.state.bgp === '') return null
        else if (this.state.bgp >= 1 && this.state.bgp <= 64511) return 'success';
        else if (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(this.state.whois)) return 'success';
        else return 'error';
    }

    getBgpData() {
        const bgpQuery = this.state.bgp;
        if ((this.getValidationStateBgp()) === 'success') {
            axios.all([
                axios.get(`https://stat.ripe.net/data/as-overview/data.json?resource=${bgpQuery}`),
                axios.get(`https://stat.ripe.net/data/geoloc/data.json?resource=${bgpQuery}`)
            ])
                .then(axios.spread((overview, geoData) => {
                    //console.log(geoData.data.data)
                    this.setState({ holder: overview.data.data.holder });
                    this.setState({ geoData: geoData.data.data });
                }))
                .catch(error => {
                    this.setState({ holder: '' })
                });
        }
        else {
            console.log('error');
            this.setState.holder = '';
        }

    }

    handleChangeBgp(e) {
        this.setState({ bgp: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getBgpData();
    }

    render() {
        return (
            <div className="bgp-root-div">
                <h3>BGPv4 Prefixes</h3>
                <div className="bgp-form-class">
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormGroup
                            controlId="formBgp"
                            validationState={this.getValidationStateBgp()}
                        >
                            <FormControl
                                type="text"
                                value={this.state.bgp}
                                placeholder="BGP"
                                onChange={this.handleChangeBgp}
                            />
                            <Button type="submit">Submit</Button>
                            <HelpBlock>Enter a BGP ASN (1-64511) </HelpBlock>
                        </FormGroup>
                    </Form>
                </div>
                <div className="bgp-results">
					<div className="bgp-holder">
                    	<h3>{this.state.holder}</h3>
					</div>
					<div>
						<Prefixes prefixesData={this.state.geoData}/>
						
					</div>


                </div>
            </div>
        )
    }
}