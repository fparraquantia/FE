import { Colors } from "@/_styles/variables/colors";
import { validateMessages } from "@/app/_helpers/validationsAnt";
import { useGetApplicationTypes, useGetProductsByApplicationType } from "@/app/_hooks/useSites";
import { Application, SiteDetail, UpdateCreateSite } from "@/app/_types/endpoint/Site";
import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Form, FormInstance, Select, Switch } from "antd";
import React, { useEffect, useMemo } from "react";

import styles from "./NewApplication.module.scss";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const formItemLayout2Col = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

interface NewApplicationProps {
  form: FormInstance<UpdateCreateSite>;
  selectedApplication: number;
  siteData?: SiteDetail;
}

export default function NewApplication({ form, selectedApplication, siteData }: NewApplicationProps) {
  const [formApp] = Form.useForm<Application>();
  // Data from the form Application
  const dataForm = Form.useWatch((values: Application | undefined) => values, formApp);

  // Data from our Form
  const dataGeneralForm = Form.useWatch((values: UpdateCreateSite | undefined) => values, form);

  const { data: applications } = useGetApplicationTypes();
  const { data: products } = useGetProductsByApplicationType(dataForm?.type || -1, dataForm?.productTypeFlag == 1 ? "csv" : "chemical");

  // Load default values for application
  useEffect(() => {
    const currentApplication = dataGeneralForm?.applications?.find((el) => el?.type == selectedApplication);
    if (selectedApplication > 0 && currentApplication) {
      formApp.setFieldsValue(currentApplication);
    }
    if (selectedApplication == -1) {
      formApp.resetFields();
    }
  }, [siteData?.applications, selectedApplication]);

  const disabledAppTypes = useMemo(() => {
    return dataGeneralForm?.applications ? dataGeneralForm.applications.map((app) => app.type) : [];
  }, [dataGeneralForm?.applications]);

  const appOptions = useMemo(() => {
    if (applications && applications?.length > 0) {
      return applications.map((application) => ({
        label: application.name,
        value: application.id,
        disabled: application.id !== selectedApplication && disabledAppTypes.includes(application.id),
      }));
    } else {
      return [];
    }
  }, [applications, disabledAppTypes, selectedApplication]);

  const productOptions = useMemo(() => {
    if (products && products?.length > 0) {
      return products.map((product) => ({
        label: product.name,
        value: product.id,
        disabled: dataForm?.products?.includes(product.id),
      }));
    } else {
      return [];
    }
  }, [products, dataForm?.products]);

  return (
    <div className={styles.applicationContainer}>
      <Form
        {...formItemLayout}
        form={formApp}
        name="appForm"
        validateMessages={validateMessages}
        // onFinish={onFinish}
        style={{
          width: 660,
        }}>
        <div className={styles.applicationScroll}>
          <div className={styles.application}>
            <p className={`${styles.applicationTitle}`}>New Application</p>
            {/* Input Hidden */}
            <Form.Item
              name="name"
              hidden
            />
            {/* Input Hidden */}

            <Form.Item
              label="Application"
              name="type"
              labelAlign="left"
              rules={[
                {
                  required: true,
                },
              ]}
              style={{ width: "100%" }}>
              <Select
                // Disable select once we have a valid value
                disabled={selectedApplication != -1 && (dataForm?.type || -1) > 0}
                placeholder="Select application"
                style={{
                  width: 400,
                }}
                onChange={(value: number) =>
                  formApp.setFieldsValue({
                    name: appOptions.find((el) => el.value == value)?.label || "",
                    productTypeFlag: dataForm?.productTypeFlag == 1 ? 1 : 0,
                    products: undefined,
                  })
                }>
                {appOptions.map((app) => (
                  <Option
                    key={app.value}
                    disabled={app.disabled}
                    value={app.value}>
                    {app.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="CSV"
              name="productTypeFlag"
              labelAlign="left"
              style={{ width: "100%" }}>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                onChange={(value) =>
                  formApp.setFieldsValue({
                    productTypeFlag: value ? 1 : 0,
                    products: undefined,
                  })
                }
              />
            </Form.Item>
            {dataForm?.type ? (
              <Form.List name="products">
                {(fields, { add, remove }) => (
                  <>
                    <Form.Item
                      label="Products"
                      style={{ width: "100%" }}
                      labelAlign="left"
                    />
                    {fields.map((field, index) => (
                      <div
                        key={index}
                        className={styles.applicationProducts}>
                        <Form.Item
                          {...formItemLayout2Col}
                          {...field}
                          labelAlign="left"
                          label={`Product ${field.key + 1}`}
                          rules={[
                            {
                              required: true,
                              message: "Please select a product or delete this field.",
                            },
                          ]}>
                          <Select
                            placeholder="Select product"
                            style={{
                              width: 180,
                            }}>
                            {productOptions.map((product) => (
                              <Option
                                key={product.value}
                                disabled={product.disabled}
                                value={product.value}>
                                {product.label}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout2Col}
                          label={`Cost €/kg`}>
                          <Select
                            placeholder="Select cost"
                            style={{
                              width: 180,
                            }}>
                            {/* {productOptions.map((product) => (
                            <Option key={product.id} value={product.value}>
                              {product.label}
                            </Option>
                          ))} */}
                          </Select>
                        </Form.Item>
                        <IconButton
                          sx={{ marginLeft: 2 }}
                          size="small"
                          onClick={() => remove(field.name)}>
                          <Delete />
                        </IconButton>
                      </div>
                    ))}
                    <div className={styles.applicationAdd}>
                      <IconButton
                        size="medium"
                        onClick={() => add()}>
                        <Add
                          fontSize="large"
                          sx={{
                            width: 80,
                            height: 80,
                            color: Colors.grey3,
                          }}
                        />
                      </IconButton>
                    </div>
                  </>
                )}
              </Form.List>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.applicationAddSite}>
            <Button
              variant="contained"
              onClick={formApp.submit}>
              {selectedApplication == -1 ? "Add To The Site" : "Edit"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
