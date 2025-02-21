import axios from "axios";

export const getMaliciousIpsFromFile = async (fileName) => {
    
    try {
        const response = await axios.get(fileName);
        return response.data;
    }
    catch (error) {
        
    }
};