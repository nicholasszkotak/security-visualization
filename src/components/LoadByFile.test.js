import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { LoadByFile } from "./LoadByFile";
import Enzyme, { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() })

const setupWrapper = (overrideProps) => {

    const props = {
        getMaliciousIpsFromFile: jest.fn(),
        ...overrideProps,
    };

    const wrapper = shallow(<LoadByFile {...props} />);

    return wrapper;
}

describe("<LoadByFile />", () => {

    describe("initialization", () => {

        it("sets the default state fileName", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            expect(wrapper.state().fileName).toEqual("geo-values.json");
        });
    });

    describe("onFileNameChange", () => {

        it("sets state fileName to passed-in event target value", () => {

            // Arrange
            const event = {
                target: {
                    value: "new file name"
                }
            };

            const wrapper = setupWrapper();

            // Act
            wrapper.instance().onFileNameChange(event);

            // Assert
            expect(wrapper.state().fileName).toEqual(event.target.value);
        });
    });

    describe("loadByFile", () => {

        it("calls props getMaliciousIpsFromFile with fileName from state", () => {

            // Arrange
            const getMaliciousIpsFromFile = jest.fn();
            const wrapper = setupWrapper({ getMaliciousIpsFromFile });
            wrapper.setState({ fileName: "fileName" });

            // Act
            wrapper.instance().loadByFile();

            // Assert
            expect(getMaliciousIpsFromFile).toHaveBeenCalledTimes(1);
            expect(getMaliciousIpsFromFile).toHaveBeenCalledWith(wrapper.state().fileName);
        });
    });

    describe("render", () => {

        it("renders load-by-file container", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const element = wrapper.find("div#load-by-file-container");
            expect(element.exists()).toEqual(true);
        });

        it("renders form-group", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#load-by-file-container");
            const formGroup = container.find("div.form-group");
            expect(formGroup.exists()).toEqual(true);
        });

        it("renders File Name label", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#load-by-file-container");
            const formGroup = container.find("div.form-group");
            const label = formGroup.find("label");
            expect(label.exists()).toEqual(true);
            expect(label.props().htmlFor).toEqual("file-name");
            expect(label.text()).toEqual("File Name");
        });

        it("renders File Name input", () => {

            // Arrange
            const fileName = "file name";

            // Act
            const wrapper = setupWrapper();
            wrapper.setState({ fileName: fileName });
            
            // Assert
            const container = wrapper.find("div#load-by-file-container");
            const formGroup = container.find("div.form-group");
            const input = formGroup.find("input#file-name.form-control");
            expect(input.exists()).toEqual(true);
            expect(input.props().type).toEqual("text");
            expect(input.props().value).toEqual(fileName);
            expect(input.props().onChange).toEqual(wrapper.instance().onFileNameChange);
        });

        it("renders Load button", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#load-by-file-container");
            const button = container.find("button.btn.btn-primary")
            expect(button.exists()).toEqual(true);
            expect(button.props().onClick).toEqual(wrapper.instance().loadByFile);
            expect(button.text()).toEqual("Load");
        });
    });
});