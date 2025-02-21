import { getBlacklist } from "./abuseIpDb.service";
import axios from "axios";
import { dummyAbuseIpDbData } from "../data/dummyAbuseIpDbData";

jest.mock("axios");

describe("abuseIpDb.service", () => {

    beforeEach(() => {
        axios.mockClear();
    });

    describe("getBlacklist", () => {

        it("returns dummy data if passed-in options.useDummyData is true", async () => {
            
            // Arrange
            const options = {
                useDummyData: true
            };

            const getResponse = { data: "data" };
            axios.get.mockImplementationOnce(() => Promise.resolve(getResponse));
            
            // Act
            const response = await getBlacklist(options);

            // Assert
            expect(response).toEqual(dummyAbuseIpDbData);
        });

        it("calls get with formatted endpoint and config if options.useDummyData is false", async () => {

            // Arrange
            const options = {
                useDummyData: false,
                confidenceMinimum: 90,
                apiKey: "apiKey"
            };

            const getResponse = { data: "data" };
            axios.get.mockImplementationOnce(() => Promise.resolve(getResponse));
            
            // Act
            await getBlacklist(options);

            // Assert
            const expectedEndpoint = `https://api.abuseipdb.com/api/v2/blacklist?confidenceMininum=${options.confidenceMinimum}`;
            const expectedConfig = {
                headers: {
                    "Key": options.apiKey,
                    "Accept": "application/json"
                }
            };

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(expectedEndpoint, expectedConfig)
        });

        it("returns data from response if options.useDummyData is false", async () => {

            // Arrange
            const options = {
                useDummyData: false
            };

            const getResponse = { data: "data" };
            axios.get.mockImplementationOnce(() => Promise.resolve(getResponse));

            // Act
            const result = await getBlacklist(options);

            // Assert
            expect(result).toEqual(getResponse.data);
        });
    });
});

