import axios from "axios";


// Obtener todos los sitios
export const getParameters = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/parameters`);
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

// Obtener units por parámetro
export const getUnitByParameter = async (parameterId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/parameter/${parameterId}/units`
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
