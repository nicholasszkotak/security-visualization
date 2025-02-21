import axios from "axios";
import { dummyIpStackData } from "../data/dummyIpStackData";

export const getIpInformation = async (options) => {

    if (options.useDummyData) {
        return dummyIpStackData;
    }
    
    const promises = [];

    for (let i = 0; i < options.ips.length; i++) {
        const ipStackEndpoint = `http://api.ipstack.com/${options.ips[i]}?access_key=${options.apiKey}`;
        promises.push(axios.get(ipStackEndpoint));
    };

    try {
        return Promise.all(promises);
    }
    catch (error) {
    }
};