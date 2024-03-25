import React, { useEffect, useMemo, useState } from "react";
import styles from "./GeneralInformation.module.scss";
import CustomInput from "../../../../../components/shared/CustomInput/CustomInput";
import CustomSelect from "../../../../../components/shared/CustomSelect/CustomSelect";
import CustomLabel from "../../../../../components/shared/CustomLabel/CustomLabel";
import { MdEdit } from "react-icons/md";
import {
  useGetApplicationTypes,
  useGetCitiesByCountryId,
  useGetCountriesByRegion,
  useGetRegions,
} from "../../../../../app/hooks/useSites";

export default function GeneralInformation({
  selectedApplication,
  setSelectedApplication,
  siteData,
  createSiteData,
  setCreateSiteData,
}) {
  const widthLabel = 190;
  console.log(siteData);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubRegionId, setSelectedSubRegionId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(0);

  const { data: regions } = useGetRegions();
  const { data: applications } = useGetApplicationTypes();
  // Determina si la región seleccionada tiene subregiones
  const regionHasSubregions = useMemo(() => {
    const region = regions?.find((r) => r.name === selectedRegion) || false;
    return (
      region && Array.isArray(region.subregions) && region.subregions.length > 0
    );
  }, [selectedRegion, regions]);
  // Determina el ID para el fetch de países
  const fetchId = useMemo(() => {
    if (!selectedRegion) return null; // No hacer fetch si no hay región seleccionada

    const region = regions?.find((r) => r.name === selectedRegion) || null;
    if (regionHasSubregions) {
      return selectedSubRegionId; // Usa el ID de la subregión si hay subregiones
    } else {
      return region && region?.ids ? region?.ids?.[0] : ""; // Usa el ID de la región si no hay subregiones
    }
  }, [selectedRegion, selectedSubRegionId, regionHasSubregions, regions]);
  // Hook de React Query para obtener países
  const { data: countries } = useGetCountriesByRegion(fetchId, {
    enabled: !!fetchId, // Solo ejecuta el fetch si fetchId es válido
  });
  // Hook de React Query para obtener ciudades
  const { data: cities } = useGetCitiesByCountryId(selectedCountry, {
    enabled: selectedCountry > 0, // Solo ejecuta el fetch si selectedCountry > 0
  });

  // Tipo Inputs edit/create
  const type = useMemo(() => {
    return siteData && siteData?.id ? "edit" : "add";
  }, [siteData]);

  // Opciones select regiones
  const regionsOptions = useMemo(() => {
    if (regions && regions?.length > 0) {
      return regions.map((region) => ({
        label: region.name,
        value: region.name,
      }));
    } else {
      return [];
    }
  }, [regions]);

  // Opciones subregiones
  const subRegionsOptions = useMemo(() => {
    const region = (regions || []).find((r) => r.name === selectedRegion);
    return region && region?.subregions?.length > 0
      ? // Hay subregiones
        region.subregions.map((subRegion, index) => ({
          label: subRegion,
          value: region.ids[index],
        }))
      : [];
  }, [regions, selectedRegion]);

  // Opciones select countries
  const countriesOptions = useMemo(() => {
    if (countries && countries?.length > 0) {
      return countries.map((country) => ({
        label: country.name,
        value: country.id,
      }));
    } else {
      return [];
    }
  }, [countries]);

  // Opciones select countries
  const citiesOptions = useMemo(() => {
    if (cities && cities?.length > 0) {
      return cities.map((city) => ({
        label: city.name,
        value: city.id,
      }));
    } else {
      return [];
    }
  }, [cities]);

  // CAMBIOS SELECT - Actualizacion createSiteData
  // Obtenemos selectedRegion
  const handleChangeRegion = (event) => {
    const selected = event?.[0]?.value || 0;
    setSelectedRegion(selected);
    setCreateSiteData((prevData) => ({ ...prevData, region: selected }));
  };

  // Obtenemos selectedSubRegionId
  const handleSubRegionChange = (event) => {
    const selected = event?.[0]?.value || 0;
    setSelectedSubRegionId(selected);
    setCreateSiteData((prevData) => ({ ...prevData, subregion: selected }));
  };

  // Actualizacion createSiteData
  const handleCountryChange = (event) => {
    const selected = event?.[0]?.value || 0;
    setSelectedCountry(selected);
    setCreateSiteData((prevData) => ({ ...prevData, countryId: selected }));
  };

  // Actualizacion createSiteData
  const handleCityChange = (event) => {
    const selected = event?.[0]?.value || 0;
    setCreateSiteData((prevData) => ({ ...prevData, cityId: selected }));
  };

  // Actualizacion createSiteData para Inputs
  const handleChangeInput = (type) => (value) => {
    setCreateSiteData((prevData) => ({
      ...prevData,
      [type == "longitud" || type == "latitud" ? "coordinates" : type]:
        type == "longitud" || type == "latitud"
          ? { ...prevData?.coordinates, [type]: value }
          : value ?? "",
    }));
  };

  const initValueSubregion = useMemo(
    () =>
      subRegionsOptions.find(
        (option) => option.label == siteData?.subregionName
      ) || {},
    [subRegionsOptions, siteData?.subregionName]
  );

  const initValueCountry = useMemo(() => {
    return (
      countriesOptions?.find((option) => option.label === siteData?.country) ||
      {}
    );
  }, [countriesOptions, siteData?.country]);

  const initValueCity = useMemo(() => {
    return (
      citiesOptions?.find((option) => option.label === siteData?.city) || {}
    );
  }, [citiesOptions, siteData?.city]);

  return (
    <div className={styles.information}>
      <p className={`${styles.informationTitle}`}>General information</p>
      <div className={styles.informationInput}>
        <CustomInput
          initValue={siteData.name}
          style="secondary"
          label="Name"
          widthLabel={widthLabel}
          onChange={handleChangeInput("name")}
        />
      </div>
      <div className={styles.informationInput}>
        <CustomSelect
          initValue={siteData?.regionName || ""}
          style="secondary"
          label="Region"
          widthLabel={widthLabel}
          onChange={(e) => handleChangeRegion(e)}
          options={regionsOptions}
        />
      </div>
      <div className={styles.informationInput}>
        <CustomSelect
          initValue={initValueSubregion?.value || 0}
          style="secondary"
          label="Sub Region"
          widthLabel={widthLabel}
          onChange={(e) => handleSubRegionChange(e)}
          options={subRegionsOptions}
        />
      </div>
      <div className={styles.informationInput}>
        <CustomSelect
          initValue={initValueCountry?.value || 0}
          style="secondary"
          label="Country"
          widthLabel={widthLabel}
          onChange={(e) => handleCountryChange(e)}
          options={countriesOptions}
        />
      </div>
      <div className={styles.informationInput}>
        <CustomInput
          initValue={siteData?.address || ""}
          style="secondary"
          label="Address"
          widthLabel={widthLabel}
          onChange={handleChangeInput("address")}
        />
      </div>
      <div className={styles.informationInput}>
        <CustomInput
          initValue={siteData?.postalCode || ""}
          style="secondary"
          label="Code Postal"
          widthLabel={widthLabel}
          type="string"
          onChange={handleChangeInput("postalCode")}
        />
      </div>
      <div className={styles.informationInput}>
        <CustomInput
          initValue={siteData?.coordinates?.latitude || ""}
          style="secondary"
          label="Latitude"
          widthLabel={widthLabel}
          type="string"
          onChange={handleChangeInput("latitude")}
        />
      </div>
      <div className={styles.informationInput}>
        <CustomInput
          style="secondary"
          initValue={siteData?.coordinates?.longitude || ""}
          label="Longitude"
          widthLabel={widthLabel}
          type="string"
          onChange={handleChangeInput("longitude")}
        />
      </div>
      <div className={styles.informationInput}>
        <CustomInput
          initValue={siteData?.contactName || ""}
          style="secondary"
          label="Kurita Contact Person"
          widthLabel={widthLabel}
          onChange={handleChangeInput("contactName")}
        />
      </div>
      <div className={styles.informationInput}>
        <CustomInput
          initValue={siteData?.customerName || ""}
          style="secondary"
          label="Customer Name"
          widthLabel={widthLabel}
          onChange={handleChangeInput("customerName")}
        />
      </div>
      <div className={styles.informationApplication}>
        <CustomLabel label="Application" widthLabel={widthLabel}>
          <div className={`${styles.informationApplicationContainer}`}>
            {createSiteData &&
              createSiteData?.applications &&
              createSiteData?.applications.length > 0 &&
              createSiteData?.applications?.map(
                (application, index) =>
                  !!application && (
                    <div
                      className={`${styles.informationApplicationApp} ${
                        index == selectedApplication
                          ? styles.informationApplicationAppDisabled
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedApplication((prevSel) =>
                          index == prevSel ? -1 : index
                        )
                      }
                    >
                      <p>
                        {applications?.find(
                          (app) => app?.id && app?.id == application?.type
                        )?.name || ""}
                      </p>
                      <MdEdit size={22} color="#ffffff" />
                    </div>
                  )
              )}
          </div>
        </CustomLabel>
      </div>
      {type == "edit" && (
        <>
          <div className={styles.informationInput}>
            <CustomSelect
              initValue={initValueCity?.value || 0}
              style="secondary"
              label="City"
              widthLabel={widthLabel}
              onChange={(e) => handleCityChange(e)}
              options={citiesOptions}
            />
          </div>
          <div className={styles.informationInput}>
            <CustomInput
              initValue={siteData?.emailAddress || ""}
              style="secondary"
              label="Kurita contact e-mail"
              widthLabel={widthLabel}
              onChange={handleChangeInput("emailAddress")}
            />
          </div>
          <div className={styles.informationInput}>
            <CustomInput
              initValue={siteData?.contactPhone || ""}
              style="secondary"
              label="Kurita contact phone"
              widthLabel={widthLabel}
              onChange={handleChangeInput("contactPhone")}
            />
          </div>
          {/* <div className={styles.informationInput}>
            <CustomInput
              initValue={siteData?.emailAddress || ""}
              style="secondary"
              label="Customer e-mail"
              widthLabel={widthLabel}
              onChange={handleChangeInput("emailAddress")}
            />
          </div> */}
          <div className={styles.informationInput}>
            <CustomInput
              initValue={siteData?.phoneNumber || ""}
              style="secondary"
              label="Customer phone"
              widthLabel={widthLabel}
              onChange={handleChangeInput("phoneNumber")}
            />
          </div>
          <div className={styles.informationInput}>
            <CustomInput
              initValue={siteData?.tipology || ""}
              style="secondary"
              label="Site tipology"
              widthLabel={widthLabel}
              onChange={handleChangeInput("tipology")}
            />
          </div>
          <div className={styles.informationInput}>
            <CustomInput
              initValue={siteData?.weatherStation || ""}
              style="secondary"
              label="Site weather station"
              widthLabel={widthLabel}
              onChange={handleChangeInput("weatherStation")}
            />
          </div>
        </>
      )}
    </div>
  );
}
