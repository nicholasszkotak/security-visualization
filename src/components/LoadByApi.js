import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getMaliciousIpsFromApi } from "../actions/maliciousIps.actions";

export class LoadByApi extends React.Component {
    
    state = {
        abuseIpDbApiKey: "f66f22c05de3dd1f18cc70e864cd778e53c7ce8c309de06017f343f9d5d4260ce41381597524d1df",
        ipStackApiKey: "25e66b9644c2cbc7f75b709ec341dd80",
        confidenceMinimum: 90,
        totalValues: 50
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    loadByApi = () => {
        const options = this.state;
        this.props.getMaliciousIpsFromApi(options);
    }
    
    render() {

        const { abuseIpDbApiKey, ipStackApiKey, confidenceMinimum, totalValues } = this.state;
        
        return (
            <div id="load-by-api-container">
                <div className="form-group">
                    <label htmlFor="ip-stack-api-key">IPStack API Key</label>
                    <input type="text" className="form-control" id="ip-stack-api-key" name="ipStackApiKey" value={ipStackApiKey} onChange={this.onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="abuse-ipdb-api-key">AbuseIPDB API Key</label>
                    <input type="text" className="form-control" id="abuse-ipdb-api-key" name="abuseIpDbApiKey" value={abuseIpDbApiKey} onChange={this.onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confidence-minimum">Confidence Minimum</label>
                    <input type="text" className="form-control" id="confidence-minimum" name="confidenceMinimum" value={confidenceMinimum} onChange={this.onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="total-values-to-load">Total Values to Load</label>
                    <input type="text" className="form-control" id="total-values-to-load" name="totalValues" value={totalValues} onChange={this.onChange} />
                </div>
                <button className="btn btn-primary" onClick={this.loadByApi}>Load</button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMaliciousIpsFromApi: getMaliciousIpsFromApi
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoadByApi);