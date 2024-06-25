import { ApplicationUpdate, CreateSite, SiteDetail, UpdateCreateSite, UpdateSite } from "../_types/endpoint/Site";

export const formatDataToCreate = (newData: UpdateCreateSite): CreateSite => {
  const formattedData: CreateSite = {
    ...newData,
    latitude: newData.coordinates?.latitude,
    longitude: newData.coordinates?.longitude,
    applications: (newData?.applications || []).map((app) => ({
      ...app,
      name: app.name || "",
      typeId: app?.type || -1,
      products: app?.products || [],
    })),
    // .map(({ type, ...rest }) => rest),
  };

  return formattedData;
};

export const formatDataToEdit = (newData: UpdateCreateSite, originalData: SiteDetail): UpdateSite => {
  const formattedData: UpdateSite = {
    name: newData?.name || "",
    crm_customer_code: "",
    phone_number: newData?.phoneNumber || "",
    site_address: newData?.address || "",
    postal_code: newData?.postalCode || "",
    city_id: newData?.cityId || -1,
    latitude: newData?.coordinates?.latitude || "",
    longitude: newData?.coordinates?.longitude || "",
    tipology: newData?.tipology || "",
    contact_name: newData?.contactName || "",
    contact_phone: newData?.contactPhone || "",
    email_address: newData?.emailAddress || "",
    customer_name: newData?.customerName || "",
    customer_phone: newData?.phoneNumber || "",
    weather_station: newData?.weatherStation || "",
    applications: newData?.applications?.map((app, index) => {
      const originalProducts = originalData?.applications?.[index]?.products || [];
      const newProducts = app?.products || [];

      const maxLength = Math.max(originalProducts.length, newProducts.length);
      const formattedProducts = [];

      for (let i = 0; i < maxLength; i++) {
        const oldId = originalProducts[i] ? originalProducts[i] : -1;
        const newId = newProducts[i] ? newProducts[i] : -1;

        formattedProducts.push({ old_id: oldId, new_id: newId });
      }
      const formattedApp: ApplicationUpdate = {
        id: app?.id || 0,
        name: app.name || "",
        typeId: app?.type || -1,
        productTypeFlag: app?.productTypeFlag || 0,
        toDelete: false,
        products: formattedProducts || [],
      };
      return formattedApp;
    }),
  };
  return formattedData;
};
