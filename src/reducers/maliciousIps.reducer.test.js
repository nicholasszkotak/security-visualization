import { maliciousIpsReducer } from "./maliciousIps.reducer";
import { GET_MALICIOUS_IPS, GET_MALICIOUS_IPS_SUCCESS, REMOVE_MALICIOUS_IP, ADD_MALICIOUS_IP, UPDATE_MALICIOUS_IP } from '../actionTypes/maliciousIps.actionTypes';

describe("maliciousIps.reducer", () => {

    describe("GET_MALICIOUS_IPS", () => {

        it("should set isLoading to true", () => {

            // Arrange
            const state = {
                isLoading: false
            };

            const action = {
                type: GET_MALICIOUS_IPS
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.isLoading).toEqual(true);
        });

        it("should set maliciousIps to []", () => {

            // Arrange
            const state = {
                maliciousIps: ["data"]
            };

            const action = {
                type: GET_MALICIOUS_IPS
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.maliciousIps).toEqual([]);
        });

        it("should maintain existing state", () => {

            // Arrange
            const state = {
                existingState: "existingState"
            };

            const action = {
                type: GET_MALICIOUS_IPS
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.existingState).toEqual(state.existingState);
        });
    });

    describe("GET_MALICIOUS_IPS_SUCCESS", () => {

        it("should set isLoading to false", () => {

            // Arrange
            const state = {
                isLoading: true
            };

            const action = {
                type: GET_MALICIOUS_IPS_SUCCESS
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.isLoading).toEqual(false);
        });

        it("should set maliciousIps to action.payload", () => {

            // Arrange
            const newMaliciousIps = ["new"];

            const state = {
                maliciousIps: ["old"]
            };

            const action = {
                type: GET_MALICIOUS_IPS_SUCCESS,
                payload: newMaliciousIps
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.maliciousIps).toEqual(newMaliciousIps);
        });

        it("should maintain existing state", () => {

            // Arrange
            const state = {
                existingState: "existingState"
            };

            const action = {
                type: GET_MALICIOUS_IPS_SUCCESS
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.existingState).toEqual(state.existingState);
        });
    });

    describe("REMOVE_MALICIOUS_IP", () => {

        it("should set maliciousIps to new array with IP matching the action payload's ID removed", () => {

            // Arrange
            const existingMaliciousIps = [
                { id: 1, name: "A" },
                { id: 2, name: "B" },
                { id: 3, name: "C" },
            ];

            const state = {
                maliciousIps: existingMaliciousIps
            };

            const action = {
                type: REMOVE_MALICIOUS_IP,
                payload: existingMaliciousIps[1].id
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.maliciousIps.length).toEqual(2);
            expect(result.maliciousIps[0].id).toEqual(existingMaliciousIps[0].id);
            expect(result.maliciousIps[1].id).toEqual(existingMaliciousIps[2].id);
        });

       
        it("should maintain existing state", () => {

            // Arrange
            const state = {
                existingState: "existingState",
                maliciousIps: []
            };

            const action = {
                type: REMOVE_MALICIOUS_IP
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.existingState).toEqual(state.existingState);
        });
    });
    
    describe("ADD_MALICIOUS_IP", () => {

        it("should add action.payload to maliciousIps array", () => {

            // Arrange
            const newMaliciousIp = { id: 3, name: "C" };
            const existingMaliciousIps = [
                { id: 1, name: "A" },
                { id: 2, name: "B" }
            ];

            const state = {
                maliciousIps: existingMaliciousIps
            };

            const action = {
                type: ADD_MALICIOUS_IP,
                payload: newMaliciousIp
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.maliciousIps.length).toEqual(3);
            expect(result.maliciousIps[0]).toEqual(existingMaliciousIps[0]);
            expect(result.maliciousIps[1]).toEqual(existingMaliciousIps[1]);
            expect(result.maliciousIps[2]).toEqual(newMaliciousIp);
        });


        it("should maintain existing state", () => {

            // Arrange
            const state = {
                existingState: "existingState",
                maliciousIps: []
            };

            const action = {
                type: ADD_MALICIOUS_IP
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.existingState).toEqual(state.existingState);
        });
    });

    describe("UPDATE_MALICIOUS_IP", () => {

        it("should return new maliciousIps array with action.payload element updated", () => {

            // Arrange
            const updatedMaliciousIp = { id: 2, name: "C" };
            const existingMaliciousIps = [
                { id: 1, name: "A" },
                { id: 2, name: "B" }
            ];

            const state = {
                maliciousIps: existingMaliciousIps
            };

            const action = {
                type: UPDATE_MALICIOUS_IP,
                payload: updatedMaliciousIp
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.maliciousIps.length).toEqual(2);
            expect(result.maliciousIps[0]).toEqual(existingMaliciousIps[0]);
            expect(result.maliciousIps[1]).toEqual(updatedMaliciousIp);
        });


        it("should maintain existing state", () => {

            // Arrange
            const state = {
                existingState: "existingState",
                maliciousIps: []
            };

            const action = {
                type: UPDATE_MALICIOUS_IP
            };

            // Act
            const result = maliciousIpsReducer(state, action);

            // Assert
            expect(result.existingState).toEqual(state.existingState);
        });
    });
});

