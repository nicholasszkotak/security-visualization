import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { removeMaliciousIp, addMaliciousIp, updateMaliciousIp } from "../actions/maliciousIps.actions";
import "../styles/MaliciousIpTableRow.css";

export class MaliciousIpTableRow extends React.Component {

    state = {
        newRow: {
            id: "",
            ip: "",
            continent_name: "",
            country_name: "",
            region_name: "",
            city: "",
            zip: "",
            latitude: "",
            longitude: ""
        }
    }
    
    onDeleteClicked = () => {
        const { maliciousIp, removeMaliciousIp } = this.props;
        removeMaliciousIp(maliciousIp.id);
    }

    onAddClicked = () => {
        const { maliciousIps, addMaliciousIp } = this.props;
        const { newRow } = this.state;

        const newIp = {
            ...newRow,
            id: maliciousIps.length + 1,
            latitude: newRow.latitude ? parseFloat(newRow.latitude) : "",
            longitude: newRow.longitude ? parseFloat(newRow.longitude) : ""
        };

        addMaliciousIp(newIp);

        const clearedNewRow = {
            id: "",
            ip: "",
            continent_name: "",
            country_name: "",
            region_name: "",
            city: "",
            zip: "",
            latitude: "",
            longitude: ""
        };
        this.setState({ newRow: clearedNewRow });
    }
    
    onEditRowChange = (e) => {
        const { maliciousIp, updateMaliciousIp, isNewRow } = this.props;
        const { newRow } = this.state;

        if (isNewRow) {
            const editedIp = {
                ...newRow,
                [e.target.name]: e.target.value
            };
            this.setState({ newRow: editedIp })
        }
        else {

            let newValue = e.target.value;

            if (e.target.name === "latitude" || e.target.name === "longitude") {
                if (e.target.value === "") {
                    newValue = 0;
                }
                else {
                    newValue = parseFloat(e.target.value);
                }
            }

            const editedIp = {
                ...maliciousIp,
                [e.target.name]: newValue
            };

            updateMaliciousIp(editedIp);
        }
    }

    render() {
        const { isNewRow } = this.props;
        let { maliciousIp } = this.props;

        if (isNewRow) {
            maliciousIp = this.state.newRow;
        }

        return (
            <tr>
                <td>
                    <input type="text" className="form-control" name="ip" value={maliciousIp.ip || ""} onChange={this.onEditRowChange} />
                </td>
                <td>
                    <input type="text" className="form-control" name="continent_name" value={maliciousIp.continent_name || ""} onChange={this.onEditRowChange} />
                </td>
                <td>
                    <input type="text" className="form-control" name="country_name" value={maliciousIp.country_name || ""} onChange={this.onEditRowChange} />
                </td>
                <td>
                    <input type="text" className="form-control" name="region_name" value={maliciousIp.region_name || ""} onChange={this.onEditRowChange} />
                </td>
                <td>
                    <input type="text" className="form-control" name="city" value={maliciousIp.city || ""} onChange={this.onEditRowChange} />
                </td>
                <td>
                    <input type="text" className="form-control" name="zip" value={maliciousIp.zip || ""} onChange={this.onEditRowChange} />
                </td>
                <td>
                    <input type="text" className="form-control" name="latitude" value={maliciousIp.latitude} onChange={this.onEditRowChange} />
                </td>
                <td>
                    <input type="text" className="form-control" name="longitude" value={maliciousIp.longitude} onChange={this.onEditRowChange} />
                </td>
                <td>
                    <div>
                        {isNewRow && <img className="add-icon" src="plus.svg" onClick={this.onAddClicked} alt="Add" />}
                        {!isNewRow && <img className="delete-icon" src="x.svg" onClick={this.onDeleteClicked} alt="Delete" />}
                    </div>
                </td>
            </tr>

        );

    }
}

const mapStateToProps = (state) => (
    {
        maliciousIps: state.maliciousIps,
        isLoading: state.isLoading
    }
);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeMaliciousIp: removeMaliciousIp,
        addMaliciousIp: addMaliciousIp,
        updateMaliciousIp: updateMaliciousIp
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MaliciousIpTableRow);
