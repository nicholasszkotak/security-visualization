import React from 'react';
import MaliciousIpsMap from "./MaliciousIpsMap";
import MaliciousIpsTable from "./MaliciousIpsTable";
import LoadByFile from "./LoadByFile";
import LoadByApi from "./LoadByApi";
import DataLoaderSelector, { LOAD_BY_API, LOAD_BY_FILE } from "./DataLoaderSelector";
import { connect } from "react-redux";

export class MainPage extends React.Component {
    
    state = {
        selectedLoadOption: LOAD_BY_FILE
    };
    
    handleLoadOptionSelected = (value) => {
        this.setState({ selectedLoadOption: value });
    }
    
    render() {

        const { maliciousIps } = this.props;
        const { selectedLoadOption } = this.state;
        const showLoadByFile = selectedLoadOption === LOAD_BY_FILE;
        const showLoadByApi = selectedLoadOption === LOAD_BY_API;

        return (
            <div id="main-page">
                <h1>Contrast Security Exercise</h1>

                <DataLoaderSelector selectedLoadOption={selectedLoadOption} onLoadOptionSelected={this.handleLoadOptionSelected} />
                {showLoadByFile && <LoadByFile /> }
                {showLoadByApi && <LoadByApi /> }

                <hr />

                {maliciousIps.length > 0 && <MaliciousIpsMap />} 
                <MaliciousIpsTable />
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        maliciousIps: state.maliciousIps
    }
);

export default connect(mapStateToProps, null)(MainPage);