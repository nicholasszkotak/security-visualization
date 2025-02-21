import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { MaliciousIpsMapPresentation } from "./MaliciousIpsMapPresentation";
import Enzyme, { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() })

const setupWrapper = (overrideProps) => {

    const props = {
        maliciousIps: [],
        ...overrideProps
    };

    const wrapper = shallow(<MaliciousIpsMapPresentation {...props} />);

    return wrapper;
}

describe("<MaliciousIpsMapPresentation />", () => {
    
    describe("render", () => {
        
        it("renders GoogleMap", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const element = wrapper.find("GoogleMap");
            expect(element.exists()).toEqual(true);
            expect(element.props().defaultZoom).toEqual(1);
            expect(element.props().defaultCenter).toEqual({ lat: -34.397, lng: 150.644 });
        });

        it("renders Marker for each malicious IP", () => {

            // Arrange
            const maliciousIps = [
                { id: 1, latitude: 1, longitude: 1 },
                { id: 2, latitude: 2, longitude: 2 },
                { id: 3, latitude: 3, longitude: 3 }
            ];

            // Act
            const wrapper = setupWrapper({ maliciousIps });

            // Assert
            const container = wrapper.find("GoogleMap");
            const markers = container.find("Marker");
            expect(markers.length).toEqual(3);

            expect(markers.at(0).key()).toEqual("1");
            expect(markers.at(0).props().position).toEqual({ lat: 1, lng: 1 });
            expect(markers.at(1).key()).toEqual("2");
            expect(markers.at(1).props().position).toEqual({ lat: 2, lng: 2 });
            expect(markers.at(2).key()).toEqual("3");
            expect(markers.at(2).props().position).toEqual({ lat: 3, lng: 3 });
        });
    });
});