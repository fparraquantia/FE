import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./NewApplication.module.scss";
import CustomSelect from "../../../../../components/shared/CustomSelect/CustomSelect";
import { FiPlus } from "react-icons/fi";
import CustomToggle from "../../../../../components/shared/CustomToggle/CustomToggle";
import CustomLabel from "../../../../../components/shared/CustomLabel/CustomLabel";
import CustomButton from "../../../../../components/shared/CustomButton/CustomButton";
import {
  useGetApplicationTypes,
  useGetProductsByApplicationType,
} from "../../../../../app/hooks/useSites";

export default function NewApplication({
  selectedApplication,
  setSelectedApplication,
  createSiteData,
  setCreateSiteData,
  siteData,
}) {
  const widthLabel = 95;
  const selectRef = useRef();

  const [isCsv, setIsCsv] = useState(false);
  const [applicationProducts, setApplicationProducts] = useState({});

  const { data: applications } = useGetApplicationTypes();
  const { data: products } = useGetProductsByApplicationType(
    applicationProducts?.type,
    isCsv ? "csv" : "chemical",
    { enabled: !!applicationProducts?.type }
  );
  useEffect(() => {
    setIsCsv(
      createSiteData?.applications?.[selectedApplication]?.productTypeFlag ==
        1 || false
    );
  }, [createSiteData?.applications, selectedApplication]);

  useEffect(() => {
    setApplicationProducts(
      createSiteData?.applications?.[selectedApplication] || {}
    );
  }, [createSiteData?.applications, selectedApplication]);

  //  Añadimos las applications al createSiteData al renderizarse
  useEffect(() => {
    setCreateSiteData((prevData) => ({
      ...prevData,
      applications: siteData?.applications?.filter((app) => app != null) || [],
    }));
  }, [applications, siteData?.applications]);

  const appOptions = useMemo(() => {
    if (applications && applications?.length > 0) {
      return applications.map((application) => ({
        label: application.name,
        value: application.id,
      }));
    } else {
      return [];
    }
  }, [applications]);

  useEffect(() => {
    setApplicationProducts((prevData) => ({
      ...prevData,
      productTypeFlag: isCsv ? 1 : 0,
    }));
  }, [isCsv]);

  const productOptions = useMemo(() => {
    if (products && products?.length > 0) {
      return products.map((product) => ({
        label: product.name,
        value: product.id,
      }));
    } else {
      return [];
    }
  }, [products]);

  const editing = useMemo(() => {
    return !!applicationProducts?.type;
  }, [applicationProducts?.type]);

  const handleChangeApp = (event) => {
    const selected = event?.[0] || {};
    if (selected.value && selected.label) {
      setApplicationProducts((prevData) => ({
        ...prevData,
        id: prevData?.id || -1,
        name: selected.label,
        type: selected.value,
      }));
    } else {
      setApplicationProducts({});
    }
  };

  // Editamos applicationProducts
  const handleChangeSelectProduct = useCallback(
    (index) => (value) => {
      if (editing) {
        const editProduct =
          value?.[0] && value?.[0]?.value ? value?.[0]?.value : undefined;
        setApplicationProducts((prevData) => {
          if (!prevData?.products || !editProduct) return prevData;
          let newProducts = prevData?.products.slice();
          newProducts[index] = editProduct;
          return {
            ...prevData,
            products: newProducts,
          };
        });
      }
    },
    [editing]
  );

  // Añadimos nuevo product con botón "+"
  const handleAddProductClick = useCallback(() => {
    if (editing) {
      setApplicationProducts((prevData) => {
        return {
          ...prevData,
          products:
            prevData?.products && prevData?.products.length > 0
              ? [...prevData?.products, -1]
              : [-1],
        };
      });
    }
  }, [editing]);

  // Añadimos applicationProducts editados a los productos
  const handleEditToTheSite = useCallback(() => {
    if (editing) {
      const newApplications = [...createSiteData.applications];
      if (selectedApplication === -1) {
        // Añadir una nueva aplicación
        newApplications.push(applicationProducts);
      } else {
        // Editar una aplicación existente
        newApplications[selectedApplication] = applicationProducts;
      }
      setCreateSiteData((prevData) => ({
        ...prevData,
        applications: newApplications,
      }));
      setApplicationProducts({});
      setSelectedApplication(-1);
    }
  }, [applicationProducts, createSiteData?.applications]);

  const csvText = () => (
    <div className={styles.applicationInputProductsRowCSV}>
      <p
        style={{ color: "#3e9288" }}
        className={styles.applicationInputProductsRowCSVText}
      >
        CSV
      </p>
    </div>
  );

  const initValueApplication = useMemo(() => {
    return appOptions.find((option) => {
      return selectedApplication != -1
        ? option.value ==
            createSiteData?.applications?.[selectedApplication]?.type || ""
        : "";
    });
  }, [appOptions, createSiteData?.applications, selectedApplication]);

  const ApplicationProduct = useCallback(
    ({ productData, index }) => {
      // El valor inicial tiene que coincidir con alguna de las opciones
      const initValue = productOptions?.find((opt) =>
        createSiteData?.applications?.[selectedApplication]?.products?.[index]
          ? opt?.value ==
            createSiteData?.applications?.[selectedApplication]?.products?.[
              index
            ]
          : false
      );

      const sameInitialProductTypeFlag =
        createSiteData?.applications?.[selectedApplication]?.productTypeFlag ==
        isCsv;
      return (
        <div className={styles.applicationInputProductsRow}>
          <CustomSelect
            placeHolder="--"
            initValue={sameInitialProductTypeFlag ? initValue?.value || -1 : -1}
            style="secondary"
            label={`Product ${index + 1}`}
            widthLabel={widthLabel - 10}
            labelPosition="left"
            onChange={handleChangeSelectProduct(index)}
            options={productOptions}
            optionsWidth={330}
            optionElement={isCsv && csvText()}
            gap={5}
            disabled={!editing}
            showValuesWhenDisabled={false}
          />
          <CustomSelect
            placeHolder="--"
            initValue={1}
            style="secondary"
            label="Cost €/kg"
            labelPosition="left"
            widthLabel={widthLabel - 10}
            // onChange={handleChangeSelectCost(index)}
            options={[{ label: "2", value: 1 }]}
            gap={5}
            disabled={!editing}
            showValuesWhenDisabled={false}
          />
        </div>
      );
    },
    [
      isCsv,
      productOptions,
      editing,
      createSiteData?.applications,
      selectedApplication,
    ]
  );

  return (
    <div className={styles.applicationContainer}>
      <div className={styles.applicationScroll}>
        <div className={styles.application}>
          <p className={`${styles.applicationTitle}`}>New Application</p>

          <div className={styles.applicationInput}>
            <CustomSelect
              ref={selectRef}
              placeHolder="Select"
              initValue={initValueApplication?.value || 0}
              style="secondary"
              label="Application"
              widthLabel={widthLabel}
              onChange={(e) => handleChangeApp(e)}
              options={appOptions}
              disabled={applicationProducts?.products?.length > 0 || false}
            />
          </div>
          <div className={styles.applicationInput}>
            <CustomLabel label="CSV" widthLabel={widthLabel}>
              <div className={styles.applicationInputToggle}>
                <p className={styles.applicationInputToggleText}>No</p>
                <CustomToggle isActive={isCsv} setIsActive={setIsCsv} />
                <p
                  className={`${
                    isCsv ? styles.applicationInputToggleTextChecked : ""
                  } ${styles.applicationInputToggleText}`}
                >
                  Yes
                </p>
              </div>
            </CustomLabel>
          </div>
          <div className={styles.applicationInputProducts}>
            <div className={styles.applicationInputProductsTitleProd}>
              <CustomLabel label="Products" labelPosition="left" />
            </div>
            {applicationProducts?.products?.length > 0 &&
              applicationProducts?.products.map((productData, index) => (
                <ApplicationProduct
                  key={index}
                  productData={productData}
                  index={index}
                />
              ))}

            <div className={styles.applicationAddButton}>
              <FiPlus
                size={80}
                color={"#E6E6E6"}
                className={styles.applicationAddButtonIcon}
                onClick={handleAddProductClick}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.applicationAddSite}>
        <div className={styles.applicationAddSiteButton}>
          <CustomButton
            title={selectedApplication == -1 ? "Add To The Site" : "Edit"}
            disabled={!editing}
            onClick={handleEditToTheSite}
          />
        </div>
      </div>
    </div>
  );
}
