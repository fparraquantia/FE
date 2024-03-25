import axios from "axios";

const BASE_URL =
  "https://backend---prod.nicepebble-288f7616.westeurope.azurecontainerapps.io";

// Obtener todos los sitios
export const getSites = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sites`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Error del servidor");
    } else {
      console.error(error);
    }
  }
};

// Crear un sitio
export const createSite = async (siteData) => {
  try {
    const response = await axios.post(`${BASE_URL}/sites/create`, siteData);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Error del servidor");
    } else {
      console.error(error);
    }
  }
};

// Obtener un sitio específico
export const getSite = async (siteId) => {
  try {
    const response = await axios.get(`${BASE_URL}/sites/${siteId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Error del servidor");
    } else {
      console.error(error);
    }
  }
};

// Borrar un sitio específico
export const deleteSite = async (siteId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/sites/${siteId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Error del servidor");
    } else {
      console.error(error);
    }
  }
};

// Actualizar un sitio específico
export const updateSite = async ({ id, updateData }) => {
  console.log("siteID:", id);
  console.log("updateData:", updateData);
  try {
    const response = await axios.put(`${BASE_URL}/sites/${id}`, updateData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Error del servidor");
    } else {
      console.error(error);
    }
  }
};
// Obtener todas las regiones
export const getRegions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/regions`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Error del servidor");
    } else {
      console.error(error);
    }
  }
};

// Obtener los países de una región específica
export const getCountriesByRegion = async (regionId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/region/${regionId}/countries`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Error del servidor");
    } else {
      console.error(error);
    }
  }
};

// Obtener los ciudades de un pais específico
export const getCitiesByCountryId = async (countryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/regions/cities/${countryId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Error del servidor");
    } else {
      console.error(error);
    }
  }
};
// Obtener los tipos de aplicaciones
export const getApplicationTypes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/applications/types`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Error del servidor");
    } else {
      console.error(error);
    }
  }
};

// Obtener los productos de un tipo de aplicación específico y tipo de producto
export const getProductsByApplicationType = async (
  applicationTypeId,
  productType
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/applications/${applicationTypeId}/products/${productType}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Error del servidor");
    } else {
      console.error(error);
    }
  }
};
