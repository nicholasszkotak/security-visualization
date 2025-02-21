import { MainPage } from "./MainPage";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { LOAD_BY_FILE, LOAD_BY_API } from "./DataLoaderSelector";
import Enzyme, { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() })

const setupWrapper = (overrideProps) => {

    const props = {
        maliciousIps: [],
        ...overrideProps
    };

    const wrapper = shallow(<MainPage {...props} />);

    return wrapper;
}

describe("<MainPage />", () => {

    describe("initialization", () => {

        it("sets the default state fileName", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            expect(wrapper.state().selectedLoadOption).toEqual(LOAD_BY_FILE);
        });
    });

    describe("handleLoadOptionSelected", () => {

        it("sets state selectedLoadOption to passed-in value", () => {

            // Arrange
            const value = LOAD_BY_API;
            const wrapper = setupWrapper();

            // Act
            wrapper.instance().handleLoadOptionSelected(value);

            // Assert
            expect(wrapper.state().selectedLoadOption).toEqual(value);
        });
    });
    
    describe("render", () => {
        
        it("renders main-page container", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const element = wrapper.find("div#main-page");
            expect(element.exists()).toEqual(true);
        });

        it("renders header", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#main-page");
            const header = container.find("h1");
            expect(header.exists()).toEqual(true);
            expect(header.text()).toEqual("Contrast Security Exercise");
        });

        it("renders DataLoaderSelector", () => {

            // Arrange
            const selectedLoadOption = "option";

            // Act
            const wrapper = setupWrapper();
            wrapper.setState({ selectedLoadOption: selectedLoadOption });

            // Assert
            const container = wrapper.find("div#main-page");
            const element = container.find("DataLoaderSelector");

            expect(element.exists()).toEqual(true);
            expect(element.props().selectedLoadOption).toEqual(selectedLoadOption);
            expect(element.props().onLoadOptionSelected).toEqual(wrapper.instance().handleLoadOptionSelected);
        });

        it("renders LoadByFile if selectedLoadOption is LOAD_BY_FILE", () => {

            // Arrange
            const selectedLoadOption = LOAD_BY_FILE;

            // Act
            const wrapper = setupWrapper();
            wrapper.setState({ selectedLoadOption: selectedLoadOption });

            // Assert
            const container = wrapper.find("div#main-page");
            const element = container.find("Connect(LoadByFile)");

            expect(element.exists()).toEqual(true);
        });

        it("does not render LoadByFile if selectedLoadOption is not LOAD_BY_FILE", () => {

            // Arrange
            const selectedLoadOption = "other";

            // Act
            const wrapper = setupWrapper();
            wrapper.setState({ selectedLoadOption: selectedLoadOption });

            // Assert
            const container = wrapper.find("div#main-page");
            const element = container.find("Connect(LoadByFile)");

            expect(element.exists()).toEqual(false);
        });

        it("renders LoadByApi if selectedLoadOption is LOAD_BY_API", () => {

            // Arrange
            const selectedLoadOption = LOAD_BY_API;

            // Act
            const wrapper = setupWrapper();
            wrapper.setState({ selectedLoadOption: selectedLoadOption });

            // Assert
            const container = wrapper.find("div#main-page");
            const element = container.find("Connect(LoadByApi)");

            expect(element.exists()).toEqual(true);
        });

        it("does not render LoadByApi if selectedLoadOption is not LOAD_BY_API", () => {

            // Arrange
            const selectedLoadOption = "other";

            // Act
            const wrapper = setupWrapper();
            wrapper.setState({ selectedLoadOption: selectedLoadOption });

            // Assert
            const container = wrapper.find("div#main-page");
            const element = container.find("Connect(LoadByApi)");

            expect(element.exists()).toEqual(false);
        });

        it("renders hr", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#main-page");
            const element = container.find("hr");
            expect(element.exists()).toEqual(true);
        });

        it("does not render MaliciousIpsMap if maliciousIps length is 0", () => {

            // Arrange
            const maliciousIps = [];

            // Act
            const wrapper = setupWrapper({ maliciousIps });

            // Assert
            const container = wrapper.find("div#main-page");
            const element = container.find("withProps(withScriptjs(withGoogleMap(Connect(MaliciousIpsMapPresentation))))");
            expect(element.exists()).toEqual(false);
        });

        it("renders MaliciousIpsMap if maliciousIps length is greater than 0", () => {

            // Arrange
            const maliciousIps = [{}];

            // Act
            const wrapper = setupWrapper({ maliciousIps });

            // Assert
            const container = wrapper.find("div#main-page");
            const element = container.find("withProps(withScriptjs(withGoogleMap(Connect(MaliciousIpsMapPresentation))))");
            expect(element.exists()).toEqual(true);
        });

        it("renders MaliciousIpsTable", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div#main-page");
            const element = container.find("Connect(MaliciousIpsTable)");
            expect(element.exists()).toEqual(true);
        });
    });
});