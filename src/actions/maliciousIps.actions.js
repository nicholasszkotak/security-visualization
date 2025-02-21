import { GET_MALICIOUS_IPS, GET_MALICIOUS_IPS_SUCCESS, REMOVE_MALICIOUS_IP, ADD_MALICIOUS_IP, UPDATE_MALICIOUS_IP } from "../actionTypes/maliciousIps.actionTypes";
import { getMaliciousIpsFromFile as _getMaliciousIpsFromFile } from "../services/maliciousIps.service";
import { getBlacklist } from "../services/abuseIpDb.service";
import { getIpInformation } from "../services/ipStack.service";

export const getMaliciousIpsFromFile = (fileName) => {

    return async (dispatch) => {

        dispatch({ type: GET_MALICIOUS_IPS });
        
        try {
            const data = await _getMaliciousIpsFromFile(fileName);
            dispatch({ type: GET_MALICIOUS_IPS_SUCCESS, payload: mapResponseDataToIps(data) })
        }
        catch (error) {
        }
    }
};

export const getMaliciousIpsFromApi = (options) => {

    return async (dispatch) => {

        dispatch({ type: GET_MALICIOUS_IPS });

        try {

            const blacklistOptions = {
                apiKey: options.abuseIpDbApiKey,
                confidenceMinimum: options.confidenceMinimum,
                useDummyData: options.useDummyData
            };
            const abuseIpdbData = await getBlacklist(blacklistOptions);

            const ipInformationOptions = {
                ips: abuseIpdbData.data.map(x => x.ipAddress).slice(0, options.totalValues),
                apiKey: options.ipStackApiKey,
                useDummyData: options.useDummyData
            };

            const fullData = await getIpInformation(ipInformationOptions);
            
            dispatch({ type: GET_MALICIOUS_IPS_SUCCESS, payload: mapResponseDataToIps(fullData) })
        }
        catch (error) {

        }
    }
};

export const removeMaliciousIp = (id) => {
    return (dispatch) => {
        dispatch({ type: REMOVE_MALICIOUS_IP, payload: id });
    }
}

export const addMaliciousIp = (ip) => {
    return (dispatch) => {
        dispatch({ type: ADD_MALICIOUS_IP, payload: ip });
    }
}

export const updateMaliciousIp = (ip) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_MALICIOUS_IP, payload: ip });
    }
}

export const mapResponseDataToIps = (responseData) => {
    return responseData.map((response, index) => {
        const ipData = response.data;
        return {
            id: index,
            ip: ipData.ip,
            continent_name: ipData.continent_name,
            country_name: ipData.country_name,
            region_name: ipData.region_name,
            city: ipData.city,
            zip: ipData.zip,
            latitude: ipData.latitude,
            longitude: ipData.longitude
        };
    });
}