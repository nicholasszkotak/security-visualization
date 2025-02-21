import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { MaliciousIpsTable } from "./MaliciousIpsTable";
import Enzyme, { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() })

const setupWrapper = (overrideProps) => {

    const props = {
        maliciousIps: [],
        isLoading: false,
        ...overrideProps
    };

    const wrapper = shallow(<MaliciousIpsTable {...props} />);

    return wrapper;
}

describe("<MaliciousIpsTable />", () => {
    
    describe("render", () => {
        
        it("renders responsive table container", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const element = wrapper.find("div.table-responsive");
            expect(element.exists()).toEqual(true);
        });

        it("renders table", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div.table-responsive");
            const element = container.find("table#malicious-ips-table.table");
            expect(element.exists()).toEqual(true);
        });

        it("renders table header", () => {

            // Arrange

            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div.table-responsive");
            const table = container.find("table#malicious-ips-table.table");

            const thead = table.find("thead");
            expect(thead.exists()).toEqual(true);

            const tr = thead.find("tr");
            expect(tr.exists()).toEqual(true);

            const ths = tr.find("th");
            expect(ths.length).toEqual(9);

            expect(ths.at(0).text()).toEqual("IP Address");
            expect(ths.at(1).text()).toEqual("Continent");
            expect(ths.at(2).text()).toEqual("Country");
            expect(ths.at(3).text()).toEqual("Region");
            expect(ths.at(4).text()).toEqual("City");
            expect(ths.at(5).text()).toEqual("Zip");
            expect(ths.at(6).text()).toEqual("Latitude");
            expect(ths.at(7).text()).toEqual("Longitude");
            expect(ths.at(8).text()).toEqual("Actions");
        });

        it("renders MaliciousIpTableRow for each IP in props.maliciousIps", () => {

            // Arrange
            const maliciousIps = [
                { id: 1 },
                { id: 2 },
                { id: 3 }
            ];

            // Act
            const wrapper = setupWrapper({ maliciousIps: maliciousIps });

            // Assert
            const container = wrapper.find("div.table-responsive");
            const table = container.find("table#malicious-ips-table.table");

            const tbody = table.find("tbody");
            expect(tbody.exists()).toEqual(true);

            const rows = tbody.find("Connect(MaliciousIpTableRow)");
            expect(rows.length).toEqual(maliciousIps.length + 1);
            
            expect(rows.at(0).key()).toEqual("" + maliciousIps[0].id);
            expect(rows.at(0).props().maliciousIp).toEqual(maliciousIps[0]);
            expect(rows.at(1).key()).toEqual("" + maliciousIps[1].id);
            expect(rows.at(1).props().maliciousIp).toEqual(maliciousIps[1]);
            expect(rows.at(2).key()).toEqual("" + maliciousIps[2].id);
            expect(rows.at(2).props().maliciousIp).toEqual(maliciousIps[2]);
        });

        it("renders MaliciousIpTableRow for new row", () => {

            // Arrange
            
            // Act
            const wrapper = setupWrapper();

            // Assert
            const container = wrapper.find("div.table-responsive");
            const table = container.find("table#malicious-ips-table.table");
            const tbody = table.find("tbody");
            const rows = tbody.find("Connect(MaliciousIpTableRow)");

            expect(rows.length).toEqual(1);
            expect(rows.at(0).props().isNewRow).toEqual(true);
        });
    });
});