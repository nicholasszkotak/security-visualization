import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getMaliciousIpsFromApi } from "../actions/maliciousIps.actions";

export class LoadByApi extends React.Component {
    
    state = {
        abuseIpDbApiKey: "",
        ipStackApiKey: "",
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