import axios from "axios";



//1-Existing assets
export const getAssets = async () => {
  try {
      const response = await axios.get(`${BASE_URL}/assets/types`);
      if (response.status === 200) {
          return response.data;
      }
  } catch (error) {
      console.error(error);
  }
};

//2-Get assets properties
export const getAssetsProperties = async (assetId) => {
  try {
      const response = await axios.get(`${BASE_URL}/assets/${assetId}/properties`);
      if (response.status === 200) {
          return response.data[0];
      }
  } catch (error) {
      console.error(error);
  }
};

//3-Update assets properties
export const updateAssetsProperties = async (assetId, body) => {
  try {
      const response = await axios.put(`${BASE_URL}/assets/${assetId}/properties`, body);
      if (response.status === 200) {
          return response.data;
      }
  } catch (error) {
      console.error(error);
  };
}

//4- create asset
export const createAsset = async (assetTypeId, siteId) => {

  try {
      const body = {
          assetTypeId: assetTypeId,
          siteId: Number(siteId)
      };
      const response = await axios.post(`${BASE_URL}/assets/create`, body);
      if (response.status === 201) {
          console.log(response)
          return response.data;
      }
  } catch (error) {
      console.error(error);
  }
};

//5- get site assets
export const getAssetsBySite = async (siteId) => {
  try {
      const response = await axios.get(`${BASE_URL}/assets/site/${siteId}`);
      if (response.status === 200) {
          return response.data;
      }
  } catch (error) {
      console.error(error);
  }
};