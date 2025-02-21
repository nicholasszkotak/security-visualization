import React from 'react';
import { connect } from "react-redux";
import MaliciousIpTableRow from "./MaliciousIpTableRow";

export class MaliciousIpsTable extends React.Component {
    
    render() {
        const { maliciousIps } = this.props;
        
        return (
            <div className="table-responsive">
                <table id="malicious-ips-table" className="table">
                    <thead>
                        <tr>
                            <th>IP Address</th>
                            <th>Continent</th>
                            <th>Country</th>
                            <th>Region</th>
                            <th>City</th>
                            <th>Zip</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maliciousIps.map(maliciousIp => <MaliciousIpTableRow key={maliciousIp.id} maliciousIp={maliciousIp} />)}
                        <MaliciousIpTableRow isNewRow />
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        maliciousIps: state.maliciousIps,
        isLoading: state.isLoading
    }
);

export default connect(mapStateToProps, null)(MaliciousIpsTable);
