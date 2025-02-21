import axios from "axios";
import { dummyAbuseIpDbData } from "../data/dummyAbuseIpDbData";

export const getBlacklist = async (options) => {
    
    if (options.useDummyData) {
        return dummyAbuseIpDbData;
    }

    const { apiKey, confidenceMinimum } = options;
    const endpoint = `https://api.abuseipdb.com/api/v2/blacklist?confidenceMininum=${confidenceMinimum}`;
    const config = {
        headers: {
            "Key": apiKey,
            "Accept": "application/json"
        }
    };
        
    try {
        const response = await axios.get(endpoint, config);
        return response.data;
    }
    catch (error) {

    }
    
};
