import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getMaliciousIpsFromFile } from "../actions/maliciousIps.actions";

export class LoadByFile extends React.Component {
    
    state = {
        fileName: "geo-values.json"
    };

    onFileNameChange = (e) => {
        this.setState({ fileName: e.target.value });
    }
    
    loadByFile = () => {
        const { fileName } = this.state;
        this.props.getMaliciousIpsFromFile(fileName);
    }
    
    render() {

        const { fileName } = this.state;

        return (
            <div id="load-by-file-container">
                <div className="form-group">
                    <label htmlFor="file-name">File Name</label>
                    <input type="text" className="form-control" id="file-name" value={fileName} onChange={this.onFileNameChange} />
                </div>
                <button className="btn btn-primary" onClick={this.loadByFile}>Load</button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMaliciousIpsFromFile: getMaliciousIpsFromFile
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoadByFile);