import { getMaliciousIpsFromFile } from "./maliciousIps.service";
import axios from "axios";
jest.mock("axios");

describe("maliciousIps.service", () => {

    beforeEach(() => {
        axios.mockClear();
    });

    describe("getMaliciousIpsFromFile", () => {

        it("calls get with passed-in file name", async () => {
            
            // Arrange
            const getResponse = { data: "data" };
            axios.get.mockImplementationOnce(() => Promise.resolve(getResponse));

            const fileName = "filename";

            // Act
            await getMaliciousIpsFromFile(fileName);

            // Assert
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(fileName);
        });

        it("returns data from response", async () => {

            // Arrange
            const getResponse = { data: "data" };
            axios.get.mockImplementationOnce(() => Promise.resolve(getResponse));

            const fileName = "filename";

            // Act
            const result = await getMaliciousIpsFromFile(fileName);

            // Assert
            expect(result).toEqual(getResponse.data);
        });
    });
});

