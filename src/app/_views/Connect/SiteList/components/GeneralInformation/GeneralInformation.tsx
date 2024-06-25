import { validateMessages } from "@/app/_helpers/validationsAnt";
import { useGetApplicationTypes, useGetCitiesByCountryId, useGetCountriesByRegion, useGetRegions } from "@/app/_hooks/useSites";
import { Application, SiteDetail, UpdateCreateSite } from "@/app/_types/endpoint/Site";
import { ModeEditOutlineOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Form, FormInstance, Input, InputNumber, Select } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";

import styles from "./GeneralInformation.module.scss";

const { Option } = Select;

interface GeneralInformationProps {
  form: FormInstance<UpdateCreateSite>;
  selectedApplication: number;
  setSelectedApplication: Dispatch<SetStateAction<number>>;
  siteData?: SiteDetail;
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

export default function GeneralInformation({ form, selectedApplication, setSelectedApplication, siteData }: GeneralInformationProps) {
  const { data: regions } = useGetRegions();
  const { data: applicationsData } = useGetApplicationTypes();

  // Type Inputs edit/create
  const type = useMemo(() => {
    return siteData && siteData?.id ? "edit" : "add";
  }, [siteData]);

  // Function to hydrate siteData.applications with application names
  const hydratedData = useMemo((): SiteDetail | undefined => {
    if (!siteData) return siteData;

    const hydratedApplications = siteData?.applications
      ?.filter((map) => map != null)
      .map((app) => {
        const applicationInfo = applicationsData?.find((data) => data.id === app.type);
        return {
          ...app,
          name: applicationInfo ? applicationInfo.name : "Unknown",
        };
      });
    return {
      ...siteData,
      applications: hydratedApplications,
    };
  }, [applicationsData, siteData]);

  // Fill form with data or reset the form
  useEffect(() => {
    if (hydratedData) {
      form.setFieldsValue(hydratedData);
    } else {
      form.resetFields();
    }
  }, [hydratedData]);

  // Data from the form
  const dataForm = Form.useWatch((values: UpdateCreateSite | undefined) => values, form);
  // Options select regions
  const regionsOptions = useMemo(() => {
    if (regions && regions?.length > 0) {
      return regions.map((region) => ({
        label: region.name || "",
        value: region.name || 0,
      }));
    } else {
      return [];
    }
  }, [regions]);

  // Options subregions
  const subRegionsOptions = useMemo(() => {
    if (!dataForm?.regionName) return [];
    const region = (regions || []).find((r) => r.name === dataForm?.regionName || "");
    return region && region?.subregions && region?.subregions?.length > 0
      ? // Hay subregiones
        region.subregions.map((subRegion, index) => ({
          label: subRegion,
          value: region?.ids?.[index] || 0,
        }))
      : [];
  }, [regions, dataForm]);

  // Determines the ID for the country fetch
  const fetchId = useMemo(() => {
    if (!dataForm?.regionName) return -1; // Do not fetch if no region is selected
    // Determines whether the selected region has sub-regions
    const region = regions?.find((r) => r.name === dataForm.regionName);
    const regionHasSubregions = !!region && Array.isArray(region.subregions) && region.subregions.length > 0;

    if (regionHasSubregions) {
      return dataForm.subregionId || -1; // Use Subregion ID
    } else {
      return region && region?.ids ? region?.ids?.[0] : -1; // Use region id if not found a subregion id
    }
  }, [dataForm, subRegionsOptions, regions]);

  // Hook de React Query para obtener países
  const { data: countries } = useGetCountriesByRegion(fetchId);
  // Hook de React Query para obtener ciudades
  const { data: cities } = useGetCitiesByCountryId(dataForm?.countryId || -1);

  // Options select cities
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

  // Options select countries
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

  // HANDLE CHANGES
  useEffect(() => {
    const newSubregionId = subRegionsOptions.find((el) => el.label === dataForm?.subregionName)?.value || -1;
    const newCountryId = countriesOptions.find((el) => el.label === dataForm?.country)?.value || -1;
    const newCityId = citiesOptions.find((el) => el.label === dataForm?.city)?.value || -1;

    form.setFieldsValue({
      subregionId: newSubregionId,
      countryId: newCountryId,
      cityId: newCityId,
    });
  }, [form, dataForm?.subregionName, dataForm?.country, dataForm?.city, subRegionsOptions, countriesOptions, citiesOptions]);

  // Reset Select Fields
  useEffect(() => {
    if (dataForm?.regionName == siteData?.regionName) {
      form.setFieldsValue({ subregionName: siteData?.subregionName });
      form.setFieldsValue({ country: siteData?.country });
      form.setFieldsValue({ city: siteData?.city });
    } else {
      form.setFieldsValue({ subregionName: "" });
      form.setFieldsValue({ country: "" });
      form.setFieldsValue({ city: "" });
    }
  }, [dataForm?.regionName]);

  useEffect(() => {
    if (dataForm?.subregionName == siteData?.subregionName) {
      form.setFieldsValue({ country: siteData?.country });
      form.setFieldsValue({ city: siteData?.city });
    } else {
      form.setFieldsValue({ country: "" });
      form.setFieldsValue({ city: "" });
    }
  }, [dataForm?.subregionName]);

  useEffect(() => {
    form.setFieldsValue({
      city: dataForm?.country == siteData?.country ? siteData?.city : "",
    });
  }, [dataForm?.country]);

  return (
    <div className={styles.information}>
      <p className={`${styles.informationTitle}`}>General information</p>
      <Form
        {...formItemLayout}
        form={form}
        name="informationForm"
        // onFinish={onFinish}
        style={{
          minWidth: 450,
        }}
        validateMessages={validateMessages}>
        {/* Input Hidden */}
        <Form.Item
          name="subregionId"
          hidden
        />
        <Form.Item
          name="countryId"
          hidden
        />
        <Form.Item
          name="cityId"
          hidden
        />
        <Form.Item
          name="applications"
          hidden
        />
        {/* Input Hidden */}

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Region"
          name="regionName"
          rules={[
            {
              required: true,
            },
          ]}>
          <Select placeholder="Select region">
            {regionsOptions.map((region) => (
              <Option
                key={region.value}
                value={region.label}>
                {region.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Sub Region"
          name="subregionName">
          <Select placeholder="Select sub region">
            {subRegionsOptions.map((subregion) => (
              <Option
                key={subregion.value}
                value={subregion.label}>
                {subregion.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              required: true,
            },
          ]}>
          <Select placeholder="Select country">
            {countriesOptions.map((country) => (
              <Option
                key={country.value}
                value={country.label}>
                {country.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Address"
          name="address">
          <Input />
        </Form.Item>
        <Form.Item
          label="Code Postal"
          name="postalCode">
          <InputNumber
            style={{
              width: "100%",
            }}
            stringMode
          />
        </Form.Item>
        <Form.Item
          label="Latitude"
          name={["coordinates", "latitude"]}
          rules={[
            {
              required: true,
            },
          ]}>
          <InputNumber
            style={{
              width: "100%",
            }}
            stringMode
          />
        </Form.Item>
        <Form.Item
          label="Longitude"
          name={["coordinates", "longitude"]}
          rules={[
            {
              required: true,
            },
          ]}>
          <InputNumber
            style={{
              width: "100%",
            }}
            stringMode
          />
        </Form.Item>
        <Form.Item
          label="Kurita Contact Person"
          name={"contactName"}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Customer Name"
          name={"customerName"}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Application"
          shouldUpdate={(prevValues, curValues) => prevValues.applications !== curValues.applications}>
          {({ getFieldValue }) => {
            const applications: Application[] = getFieldValue("applications") || [];
            return applications?.length > 0 ? (
              <ul>
                {applications?.map(
                  (application, index) =>
                    !!application && (
                      <Button
                        key={index}
                        variant="contained"
                        size="small"
                        color="redAccent"
                        endIcon={<ModeEditOutlineOutlined />}
                        className={`${styles.informationApplicationApp} ${
                          (application.type || -1) == selectedApplication ? styles.informationApplicationAppSelected : ""
                        }`}
                        sx={{
                          marginX: 1,
                          marginBottom: 1,
                          opacity: 0.9,
                        }}
                        onClick={() =>
                          setSelectedApplication((prevSel) => ((application.type || -1) == prevSel ? -1 : application.type || -1))
                        }>
                        <p>{application?.name || ""}</p>
                      </Button>
                    ),
                )}
              </ul>
            ) : (
              <></>
            );
          }}
        </Form.Item>
        {type == "edit" && (
          <>
            <Form.Item
              label="City"
              name="city">
              <Select placeholder="Select city">
                {citiesOptions.map((city) => (
                  <Option
                    key={city.value}
                    value={city.label}>
                    {city.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Kurita contact e-mail"
              name={"emailAddress"}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Kurita contact phone"
              name={"contactPhone"}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Customer phone"
              name={"phoneNumber"}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Site tipology"
              name={"tipology"}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Site weather station"
              name={"weatherStation"}>
              <Input />
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
}
