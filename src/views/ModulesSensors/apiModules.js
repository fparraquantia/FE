import axios from "axios";


//1-Connect Module to a site
export const connectModule = async (moduleId, siteId) => {

    try {
        const body = {
            sensorId: moduleId
        };
        const response = await axios.post(`${BASE_URL}/modules/${siteId}`, body);
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
};

//2-Get Modules connected
export const getModules = async (siteId) => {
    try {
        const response = await axios.get(`${BASE_URL}/modules/${siteId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
};

//3-Get Associated Sensors
export const getSensors = async (moduleId) => {
    try {
        const response = await axios.get(`${BASE_URL}/modules/${moduleId}/asociatedSensors`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
};
//4- Get Modules properties
export const getProperties = async (moduleId) => {
    try {
        const response = await axios.get(`${BASE_URL}/modules/${moduleId}/properties`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
};
//5-Update Properties
export const updateModuleProperties = async (editedModule, moduleId) => {

    try {
        const body = {
            name: editedModule.name,
            brand: editedModule.brand,
            model: editedModule.model
        };
        const response = await axios.put(`${BASE_URL}/modules/${moduleId}/properties`, body);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
};
