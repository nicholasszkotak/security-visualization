import { GET_MALICIOUS_IPS, GET_MALICIOUS_IPS_SUCCESS, REMOVE_MALICIOUS_IP, ADD_MALICIOUS_IP, UPDATE_MALICIOUS_IP } from "../actionTypes/maliciousIps.actionTypes";

const defaultState = {
    isLoading: false,
    maliciousIps: []
};

export const maliciousIpsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_MALICIOUS_IPS:
            return {
                ...state,
                isLoading: true,
                maliciousIps: []
            };
        case GET_MALICIOUS_IPS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                maliciousIps: action.payload
            };
        case REMOVE_MALICIOUS_IP:
            let newIps = [...state.maliciousIps];
            newIps = newIps.filter(x => x.id !== action.payload);

            return {
                ...state,
                maliciousIps: newIps
            };

        case ADD_MALICIOUS_IP:
            return {
                ...state,
                maliciousIps: [...state.maliciousIps, action.payload]
            };

        case UPDATE_MALICIOUS_IP:

            const items = [...state.maliciousIps];
            const index = items.findIndex(x => x.id === action.payload.id);
            items[index] = action.payload;

            return {
                ...state,
                maliciousIps: items
            }
        default:
            return state;
    }
}

export default maliciousIpsReducer;