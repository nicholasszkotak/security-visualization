import React from 'react';
import "../styles/DataLoaderSelector.css";

export const LOAD_BY_FILE = "loadByFile";
export const LOAD_BY_API = "loadByApi";

export class DataLoaderSelector extends React.Component {
    
    onLoadOptionSelected = (e) => {
        this.props.onLoadOptionSelected(e.target.value);
    }

    render() {

        const { selectedLoadOption } = this.props;

        return (
            <div id="data-loader-selector-container">
                <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" id="load-by-file" name="data-loader-option" value={LOAD_BY_FILE} 
                        checked={selectedLoadOption === LOAD_BY_FILE} onChange={this.onLoadOptionSelected} />
                    <label className="form-check-label" htmlFor="load-by-file">Load by File</label>
                </div>
                <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" id="load-by-api" name="data-loader-option" value={LOAD_BY_API}
                        checked={selectedLoadOption === LOAD_BY_API} onChange={this.onLoadOptionSelected} />
                    <label className="form-check-label" htmlFor="load-by-api">Load by API</label>
                </div>
            </div>
        );
    }
}

export default DataLoaderSelector;