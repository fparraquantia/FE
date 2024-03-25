export const formatDataToCreate = (newData) => {
  // Realiza una copia profunda del objeto para evitar mutaciones no deseadas.
  // La copia superficial con el operador spread (...) no es suficiente para objetos anidados como 'applications'.
  const formattedData = {
    ...newData,
    applications: newData.applications
      .map((app) => ({
        ...app,
        typeId: app?.type || -1,
        products: app?.products || [],
      }))
      .map(({ type, ...rest }) => rest),
  };

  return formattedData;
};

export const formatDataToEdit = (originalData, newData) => {
  // Realiza una copia profunda del objeto para evitar mutaciones no deseadas.
  // La copia superficial con el operador spread (...) no es suficiente para objetos anidados como 'applications'.
  const formattedData = {
    name: newData?.name || "",
    crm_customer_code: "",
    phone_number: newData?.phoneNumber || "",
    site_address: newData?.address || "",
    postal_code: newData?.postalCode || "",
    city_id: newData?.cityId || -1,
    latitude: newData?.latitude || "",
    longitude: newData?.longitude || "",
    tipology: newData?.tipology || "",
    contact_name: newData?.contactName || "",
    contact_phone: newData?.contactPhone || "",
    email_address: newData?.emailAddress || "",
    customer_name: newData?.customerName || "",
    customer_phone: newData?.phoneNumber || "",
    weather_station: newData?.weatherStation || "",
    applications: newData?.applications
      .map((app, index) => {
        const originalProducts =
          originalData?.applications?.[index]?.products || [];
        const newProducts = app?.products || [];

        const maxLength = Math.max(originalProducts.length, newProducts.length);
        const formattedProducts = [];

        for (let i = 0; i < maxLength; i++) {
          const oldId = !!originalProducts[i] ? originalProducts[i] : -1;
          const newId = !!newProducts[i] ? newProducts[i] : -1;

          formattedProducts.push({ old_id: oldId, new_id: newId });
        }
        return {
          ...app,
          typeId: app?.type || -1,
          productTypeFlag: app?.productTypeFlag || 0,
          toDelete: false,
          products: formattedProducts || [], // Asegura una copia del array de productos si es necesario
        };
      })
      .map(({ type, ...rest }) => rest), // Elimina la propiedad 'type'
  };
  return formattedData;
};
