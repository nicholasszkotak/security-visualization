import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { DataLoaderSelector, LOAD_BY_API } from "./DataLoaderSelector";
import Enzyme, { shallow } from "enzyme";
import { LOAD_BY_FILE } from "./DataLoaderSelector";

Enzyme.configure({ adapter: new Adapter() })

const setupWrapper = (overrideProps) => {

    const props = {
        selectedLoadOption: LOAD_BY_FILE,
        ...overrideProps
    };

    const wrapper = shallow(<DataLoaderSelector {...props} />);

    return wrapper;
}

describe("<DataLoaderSelector />", () => {

    describe("onLoadOptionSelected", () => {

        it("calls props onLoadOptionSelected with passed-in event target value", () => {

            // Arrange
            const onLoadOptionSelected = jest.fn();
            const event = {
                target: {
                    value: "value"
                }
            };

            const wrapper = setupWrapper({ onLoadOptionSelected: onLoadOptionSelected });

            // Act
            wrapper.instance().onLoadOptionSelected(event);

            // Assert
            expect(onLoadOptionSelected).toHaveBeenCalledTimes(1);
            expect(onLoadOptionSelected).toHaveBeenCalledWith(event.target.value);
        });
    });
    
    describe("render", () => {

        it("renders data-loader-selector-container", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const element = wrapper.find("div#data-loader-selector-container");
            expect(element.exists()).toEqual(true);
        });

        it("renders two form-check groups", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#data-loader-selector-container");
            const formGroups = container.find("div.form-check.form-check-inline");
            expect(formGroups.length).toEqual(2);
        });
        
        it("renders Load by File input", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#data-loader-selector-container");
            const formGroup = container.find("div.form-check.form-check-inline").at(0);
            const element = formGroup.find("input#load-by-file.form-check-input");
            expect(element.exists()).toEqual(true);
            expect(element.props().type).toEqual("radio");
            expect(element.props().name).toEqual("data-loader-option");
            expect(element.props().value).toEqual(LOAD_BY_FILE);
            expect(element.props().onChange).toEqual(wrapper.instance().onLoadOptionSelected);
        });

        it("sets Load by File chcked value to true if current props is LOAD_BY_FILE", () => {

            // Arrange
            const selectedLoadOption = LOAD_BY_FILE;

            // Act
            const wrapper = setupWrapper();
            wrapper.setProps({ selectedLoadOption: selectedLoadOption });

            // Assert
            const container = wrapper.find("div#data-loader-selector-container");
            const formGroup = container.find("div.form-check.form-check-inline").at(0);
            const element = formGroup.find("input#load-by-file.form-check-input");
            expect(element.props().checked).toEqual(true);
        });

        it("sets Load by File chcked value to false if current props is not LOAD_BY_FILE", () => {

            // Arrange
            const selectedLoadOption = "other";

            // Act
            const wrapper = setupWrapper();
            wrapper.setProps({ selectedLoadOption: selectedLoadOption });

            // Assert
            const container = wrapper.find("div#data-loader-selector-container");
            const formGroup = container.find("div.form-check.form-check-inline").at(0);
            const element = formGroup.find("input#load-by-file.form-check-input");
            expect(element.props().checked).toEqual(false);
        });

        it("renders Load by File label", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#data-loader-selector-container");
            const formGroup = container.find("div.form-check.form-check-inline").at(0);
            const element = formGroup.find("label.form-check-label");
            expect(element.exists()).toEqual(true);
            expect(element.props().htmlFor).toEqual("load-by-file");
            expect(element.text()).toEqual("Load by File");
        });
        
        it("renders Load by API input", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#data-loader-selector-container");
            const formGroup = container.find("div.form-check.form-check-inline").at(1);
            const element = formGroup.find("input#load-by-api.form-check-input");
            expect(element.exists()).toEqual(true);
            expect(element.props().type).toEqual("radio");
            expect(element.props().name).toEqual("data-loader-option");
            expect(element.props().value).toEqual(LOAD_BY_API);
            expect(element.props().onChange).toEqual(wrapper.instance().onLoadOptionSelected);
        });

        it("sets Load by API chcked value to true if current props is LOAD_BY_API", () => {

            // Arrange
            const selectedLoadOption = LOAD_BY_API;

            // Act
            const wrapper = setupWrapper();
            wrapper.setProps({ selectedLoadOption: selectedLoadOption });

            // Assert
            const container = wrapper.find("div#data-loader-selector-container");
            const formGroup = container.find("div.form-check.form-check-inline").at(1);
            const element = formGroup.find("input#load-by-api.form-check-input");
            expect(element.props().checked).toEqual(true);
        });

        it("sets Load by API chcked value to false if current props is not LOAD_BY_API", () => {

            // Arrange
            const selectedLoadOption = "other";

            // Act
            const wrapper = setupWrapper();
            wrapper.setProps({ selectedLoadOption: selectedLoadOption });

            // Assert
            const container = wrapper.find("div#data-loader-selector-container");
            const formGroup = container.find("div.form-check.form-check-inline").at(1);
            const element = formGroup.find("input#load-by-api.form-check-input");
            expect(element.props().checked).toEqual(false);
        });

        it("renders Load by API label", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#data-loader-selector-container");
            const formGroup = container.find("div.form-check.form-check-inline").at(1);
            const element = formGroup.find("label.form-check-label");
            expect(element.exists()).toEqual(true);
            expect(element.props().htmlFor).toEqual("load-by-api");
            expect(element.text()).toEqual("Load by API");
        });
    });
});