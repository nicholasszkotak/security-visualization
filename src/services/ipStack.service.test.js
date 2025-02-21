import { getIpInformation } from "./ipStack.service";
import axios from "axios";
import { dummyIpStackData } from "../data/dummyIpStackData";

jest.mock("axios");

describe("ipStack.service", () => {

    beforeEach(() => {
        axios.mockClear();
    });

    describe("getIpInformation", () => {

        it("returns dummy data if passed-in options.useDummyData is true", async () => {
            
            // Arrange
            const options = {
                useDummyData: true
            };
            
            // Act
            const response = await getIpInformation(options);

            // Assert
            expect(response).toEqual(dummyIpStackData);
        });
        
        it("calls get with formatted endpoint for each IP if options.useDummyData is false", async () => {

            // Arrange
            const options = {
                useDummyData: false,
                ips: ["a","b","c"],
                apiKey: "apiKey"
            };

            const getResponse = { data: "data" };
            axios.get.mockImplementation(() => Promise.resolve(getResponse));
            
            // Act
            await getIpInformation(options);

            // Assert
            expect(axios.get).toHaveBeenCalledTimes(options.ips.length);
            for (let i = 0; i < options.ips.length; i++) {
                const expectedEndpoint = `http://api.ipstack.com/${options.ips[i]}?access_key=${options.apiKey}`;
                expect(axios.get).toHaveBeenCalledWith(expectedEndpoint)
            }
        });

        it("returns responses from all promises if options.useDummyData is false", async () => {

            // Arrange
            const options = {
                useDummyData: false,
                ips: ["a", "b", "c"],
                apiKey: "apiKey"
            };

            for (let i = 0; i < options.ips.length; i++) {
                const getResponse = { data: options.ips[i] };
                axios.get.mockImplementationOnce(() => Promise.resolve(getResponse));
            }
            
            // Act
            const result = await getIpInformation(options);

            // Assert
            expect(result.length).toEqual(3);
            expect(result[0].data).toEqual(options.ips[0]);
            expect(result[1].data).toEqual(options.ips[1]);
            expect(result[2].data).toEqual(options.ips[2]);
        });
    });
});

