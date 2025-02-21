import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { LoadByApi } from "./LoadByApi";
import Enzyme, { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() })

const setupWrapper = (overrideProps) => {
    
    const props = {
        getMaliciousIpsFromApi: jest.fn(),
        ...overrideProps
    };
    
    const wrapper = shallow(<LoadByApi {...props} />);

    return wrapper;
}

describe("<LoadByApi />", () => {

    describe("initialization", () => {

        it("sets the default state", () => {

            // Arrange
            
            // Act
            const wrapper = setupWrapper();

            // Assert
            expect(wrapper.state().abuseIpDbApiKey).toEqual("f66f22c05de3dd1f18cc70e864cd778e53c7ce8c309de06017f343f9d5d4260ce41381597524d1df");
            expect(wrapper.state().ipStackApiKey).toEqual("25e66b9644c2cbc7f75b709ec341dd80");
            expect(wrapper.state().confidenceMinimum).toEqual(90);
            expect(wrapper.state().totalValues).toEqual(50);
        });
    });

    describe("onChange", () => {

        it("sets state property defined by event name to event target value", () => {

            // Arrange
            const event = {
                target: {
                    name: "fieldName",
                    value: "new file name"
                }
            };

            const wrapper = setupWrapper();

            // Act
            wrapper.instance().onChange(event);

            // Assert
            expect(wrapper.state()[event.target.name]).toEqual(event.target.value);
        });
    });

    describe("loadByApi", () => {

        it("calls props getMaliciousIpsFromApi with options passed in from state", () => {

            // Arrange
            const getMaliciousIpsFromApi = jest.fn();
            const wrapper = setupWrapper({ getMaliciousIpsFromApi: getMaliciousIpsFromApi });
            wrapper.setState({ data: "data" });

            // Act
            wrapper.instance().loadByApi();

            // Assert
            expect(getMaliciousIpsFromApi).toHaveBeenCalledTimes(1);
            expect(getMaliciousIpsFromApi).toHaveBeenCalledWith(wrapper.state());
        });
    });

    describe("render", () => {
        
        
        it("renders load-by-api-container", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const element = wrapper.find("div#load-by-api-container");
            expect(element.exists()).toEqual(true);
        });

        it("renders four form-groups", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#load-by-api-container");
            const formGroups = container.find("div.form-group");
            expect(formGroups.length).toEqual(4);
        });
        
        it("renders IPStack API Key label", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#load-by-api-container");
            const formGroup = container.find("div.form-group").at(0);
            const label = formGroup.find("label");
            expect(label.exists()).toEqual(true);
            expect(label.props().htmlFor).toEqual("ip-stack-api-key");
            expect(label.text()).toEqual("IPStack API Key");
        });
        
        it("renders IPStack API Key input", () => {

            // Arrange
            const ipStackApiKey = "api key";

            // Act
            const wrapper = setupWrapper();
            wrapper.setState({ ipStackApiKey: ipStackApiKey });
            
            // Assert
            const container = wrapper.find("div#load-by-api-container");
            const formGroup = container.find("div.form-group").at(0);
            const input = formGroup.find("input#ip-stack-api-key.form-control");
            expect(input.exists()).toEqual(true);
            expect(input.props().type).toEqual("text");
            expect(input.props().name).toEqual("ipStackApiKey")
            expect(input.props().value).toEqual(ipStackApiKey);
            expect(input.props().onChange).toEqual(wrapper.instance().onChange);
        });
        
        it("renders AbuseIPDB API Key label", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#load-by-api-container");
            const formGroup = container.find("div.form-group").at(1);
            const label = formGroup.find("label");
            expect(label.exists()).toEqual(true);
            expect(label.props().htmlFor).toEqual("abuse-ipdb-api-key");
            expect(label.text()).toEqual("AbuseIPDB API Key");
        });

        it("renders AbuseIPDB API Key input", () => {

            // Arrange
            const abuseIpDbApiKey = "api key";

            // Act
            const wrapper = setupWrapper();
            wrapper.setState({ abuseIpDbApiKey: abuseIpDbApiKey });

            // Assert
            const container = wrapper.find("div#load-by-api-container");
            const formGroup = container.find("div.form-group").at(1);
            const input = formGroup.find("input#abuse-ipdb-api-key.form-control");
            expect(input.exists()).toEqual(true);
            expect(input.props().type).toEqual("text");
            expect(input.props().name).toEqual("abuseIpDbApiKey");
            expect(input.props().value).toEqual(abuseIpDbApiKey);
            expect(input.props().onChange).toEqual(wrapper.instance().onChange);
        });
        
        it("renders Confidence Minimum label", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#load-by-api-container");
            const formGroup = container.find("div.form-group").at(2);
            const label = formGroup.find("label");
            expect(label.exists()).toEqual(true);
            expect(label.props().htmlFor).toEqual("confidence-minimum");
            expect(label.text()).toEqual("Confidence Minimum");
        });

        it("renders Confidence Minimum input", () => {

            // Arrange
            const confidenceMinimum = 90;

            // Act
            const wrapper = setupWrapper();
            wrapper.setState({ confidenceMinimum: confidenceMinimum });

            // Assert
            const container = wrapper.find("div#load-by-api-container");
            const formGroup = container.find("div.form-group").at(2);
            const input = formGroup.find("input#confidence-minimum.form-control");
            expect(input.exists()).toEqual(true);
            expect(input.props().type).toEqual("text");
            expect(input.props().name).toEqual("confidenceMinimum");
            expect(input.props().value).toEqual(confidenceMinimum);
            expect(input.props().onChange).toEqual(wrapper.instance().onChange);
        });
        
        it("renders Total Values to Load label", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#load-by-api-container");
            const formGroup = container.find("div.form-group").at(3);
            const label = formGroup.find("label");
            expect(label.exists()).toEqual(true);
            expect(label.props().htmlFor).toEqual("total-values-to-load");
            expect(label.text()).toEqual("Total Values to Load");
        });

        it("renders Total Values to Load input", () => {

            // Arrange
            const totalValuesToLoad = 50;

            // Act
            const wrapper = setupWrapper();
            wrapper.setState({ totalValuesToLoad: totalValuesToLoad });

            // Assert
            const container = wrapper.find("div#load-by-api-container");
            const formGroup = container.find("div.form-group").at(3);
            const input = formGroup.find("input#total-values-to-load.form-control");
            expect(input.exists()).toEqual(true);
            expect(input.props().type).toEqual("text");
            expect(input.props().name).toEqual("totalValues");
            expect(input.props().value).toEqual(totalValuesToLoad);
            expect(input.props().onChange).toEqual(wrapper.instance().onChange);
        });

        it("renders Load button", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#load-by-api-container");
            const button = container.find("button.btn.btn-primary")
            expect(button.exists()).toEqual(true);
            expect(button.props().onClick).toEqual(wrapper.instance().loadByApi);
            expect(button.text()).toEqual("Load");
        });
    });
});