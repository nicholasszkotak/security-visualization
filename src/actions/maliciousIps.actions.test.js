import { updateMaliciousIp, addMaliciousIp, removeMaliciousIp, mapResponseDataToIps, getMaliciousIpsFromFile, getMaliciousIpsFromApi } from "./maliciousIps.actions";
import { UPDATE_MALICIOUS_IP, ADD_MALICIOUS_IP, REMOVE_MALICIOUS_IP, GET_MALICIOUS_IPS, GET_MALICIOUS_IPS_SUCCESS } from "../actionTypes/maliciousIps.actionTypes";
import { getMaliciousIpsFromFile as _getMaliciousIpsFromFile } from "../services/maliciousIps.service";
import { getBlacklist } from "../services/abuseIpDb.service";
import { getIpInformation } from "../services/ipStack.service";
jest.mock("../services/maliciousIps.service");
jest.mock("../services/abuseIpDb.service");
jest.mock("../services/ipStack.service");

describe("maliciousIps.actions", () => {

    beforeEach(() => {
        _getMaliciousIpsFromFile.mockClear();
        getBlacklist.mockClear();
        getIpInformation.mockClear();
    });
    
    describe("getMaliciousIpsFromFile", () => {

        it("dispatches GET_MALICIOUS_IPS", async () => {

            // Arrange
            const fileName = "fileName";
            const dispatch = jest.fn();
            const serviceResult = [];

            _getMaliciousIpsFromFile.mockImplementationOnce((fileName) => Promise.resolve(serviceResult));

            // Act
            await getMaliciousIpsFromFile(fileName)(dispatch);

            // Assert
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch.mock.calls[0][0]).toEqual({ type: GET_MALICIOUS_IPS });
        });

        it("dispatches GET_MALICIOUS_IPS_SUCCESS with mapped payload", async () => {

            // Arrange
            const fileName = "fileName";
            const dispatch = jest.fn();
            const serviceResult = [{ data: { ip: "1" } }];

            _getMaliciousIpsFromFile.mockImplementationOnce((fileName) => Promise.resolve(serviceResult));

            // Act
            await getMaliciousIpsFromFile(fileName)(dispatch);

            // Assert
            const mappedResult = [{
                id: 0,
                ip: "1"
            }];
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch.mock.calls[1][0]).toEqual({ type: GET_MALICIOUS_IPS_SUCCESS, payload: mappedResult });
        });
    });

    describe("getMaliciousIpsFromApi", () => {
        
        it("dispatches GET_MALICIOUS_IPS", async () => {

            // Arrange
            const options = {};
            const dispatch = jest.fn();

            const getBlacklistResponse = { data: [] };
            getBlacklist.mockImplementationOnce(() => Promise.resolve(getBlacklistResponse));

            const getIpInformationResponse = [];
            getIpInformation.mockImplementationOnce(() => Promise.resolve(getIpInformationResponse));

            // Act
            await getMaliciousIpsFromApi(options)(dispatch);

            // Assert
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch.mock.calls[0][0]).toEqual({ type: GET_MALICIOUS_IPS });
        });

        it("calls getBlacklist with options derived from passed-in options", async () => {

            // Arrange
            const options = {
                abuseIpDbApiKey: "apiKey",
                confidenceMinimum: 90,
                useDummyData: true
            };
            const dispatch = jest.fn();

            const getBlacklistResponse = { data: [] };
            getBlacklist.mockImplementationOnce(() => Promise.resolve(getBlacklistResponse));

            const getIpInformationResponse = [];
            getIpInformation.mockImplementationOnce(() => Promise.resolve(getIpInformationResponse));

            // Act
            await getMaliciousIpsFromApi(options)(dispatch);

            // Assert
            const expectedOptions = {
                apiKey: options.abuseIpDbApiKey,
                confidenceMinimum: options.confidenceMinimum,
                useDummyData: options.useDummyData
            };

            expect(getBlacklist).toHaveBeenCalledTimes(1);
            expect(getBlacklist).toHaveBeenCalledWith(expectedOptions);
        });

        it("calls getIpInformation with IPs sliced from getBlacklist response and api key from options", async () => {

            // Arrange
            const options = {

                ipStackApiKey: "apiKey",
                useDummyData: true,
                totalValues: 2
            };

            const dispatch = jest.fn();

            const getBlacklistResponse = { data: [{ ipAddress: "A" }, { ipAddress: "B" }, { ipAddress: "C" }] };
            getBlacklist.mockImplementationOnce(() => Promise.resolve(getBlacklistResponse));

            const getIpInformationResponse = [];
            getIpInformation.mockImplementationOnce(() => Promise.resolve(getIpInformationResponse));

            // Act
            await getMaliciousIpsFromApi(options)(dispatch);

            // Assert
            const expectedOptions = {
                apiKey: options.ipStackApiKey,
                ips: getBlacklistResponse.data.map(x => x.ipAddress).slice(0, options.totalValues),
                useDummyData: options.useDummyData
            };

            expect(getIpInformation).toHaveBeenCalledTimes(1);
            expect(getIpInformation).toHaveBeenCalledWith(expectedOptions);
        });

        it("dispatches GET_MALICIOUS_IPS_SUCCESS with results mapped from getIpInformation response", async () => {

            // Arrange
            const options = {};
            const dispatch = jest.fn();

            const getBlacklistResponse = { data: [] };
            getBlacklist.mockImplementationOnce(() => Promise.resolve(getBlacklistResponse));

            const getIpInformationResponse = [{ data: { ip: "1" } }];
            getIpInformation.mockImplementationOnce(() => Promise.resolve(getIpInformationResponse));

            // Act
            await getMaliciousIpsFromApi(options)(dispatch);

            // Assert
            const mappedResult = [{
                id: 0,
                ip: "1"
            }];
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch.mock.calls[1][0]).toEqual({ type: GET_MALICIOUS_IPS_SUCCESS, payload: mappedResult });
        });
    })
    describe("removeMaliciousIp", () => {

        it("dispatches REMOVE_MALICIOUS_IP action with passed-in id", () => {

            // Arrange
            const id = "id";
            const dispatch = jest.fn();

            // Act
            removeMaliciousIp(id)(dispatch);

            // Assert
            const expectedAction = {
                type: REMOVE_MALICIOUS_IP,
                payload: id
            }
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith(expectedAction);
        })
    });

    describe("addMaliciousIp", () => {

        it("dispatches ADD_MALICIOUS_IP action with passed-in IP", () => {

            // Arrange
            const ip = { ip: "ip" };
            const dispatch = jest.fn();

            // Act
            addMaliciousIp(ip)(dispatch);

            // Assert
            const expectedAction = {
                type: ADD_MALICIOUS_IP,
                payload: ip
            }
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith(expectedAction);
        })
    });

    describe("updateMaliciousIp", () => {

        it("dispatches UPDATE_MALICIOUS_IP action with passed-in IP", () => {

            // Arrange
            const ip = { ip: "ip" };
            const dispatch = jest.fn();

            // Act
            updateMaliciousIp(ip)(dispatch);

            // Assert
            const expectedAction = {
                type: UPDATE_MALICIOUS_IP,
                payload: ip
            }
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith(expectedAction);
        })
    });
    
    describe("mapResponseDataToIps", () => {

        it("returns an IP object with values mapped from the passed-in response data", () => {

            // Arrange
            const responseData = [
                {
                    data: {
                        ip: "firstIp",
                        continent_name: "first continent name",
                        country_name: "first country name",
                        region_name: "first region name",
                        city: "first city",
                        zip: "first zip",
                        latitude: "first latitude",
                        longitude: "first longitude"
                    }
                },
                {
                    data: {
                        ip: "secondIp",
                        continent_name: "second continent name",
                        country_name: "second country name",
                        region_name: "second region name",
                        city: "second city",
                        zip: "second zip",
                        latitude: "second latitude",
                        longitude: "second longitude"
                    }
                }
            ];

            // Act
            const result = mapResponseDataToIps(responseData);

            // Assert
            expect(result.length).toEqual(2);
            expect(result[0].id).toEqual(0);
            expect(result[0].continent_name).toEqual(responseData[0].data.continent_name);
            expect(result[0].country_name).toEqual(responseData[0].data.country_name);
            expect(result[0].region_name).toEqual(responseData[0].data.region_name);
            expect(result[0].city).toEqual(responseData[0].data.city);
            expect(result[0].zip).toEqual(responseData[0].data.zip);
            expect(result[0].latitude).toEqual(responseData[0].data.latitude);
            expect(result[0].longitude).toEqual(responseData[0].data.longitude);

            expect(result[1].id).toEqual(1);
            expect(result[1].continent_name).toEqual(responseData[1].data.continent_name);
            expect(result[1].country_name).toEqual(responseData[1].data.country_name);
            expect(result[1].region_name).toEqual(responseData[1].data.region_name);
            expect(result[1].city).toEqual(responseData[1].data.city);
            expect(result[1].zip).toEqual(responseData[1].data.zip);
            expect(result[1].latitude).toEqual(responseData[1].data.latitude);
            expect(result[1].longitude).toEqual(responseData[1].data.longitude);
        });
    });
});