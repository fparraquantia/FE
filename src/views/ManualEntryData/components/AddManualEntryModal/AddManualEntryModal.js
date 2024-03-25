import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./AddManualEntryModal.module.scss";
import Modal from "../../../../components/shared/Modal/Modal";
import CustomSelect from "../../../../components/shared/CustomSelect/CustomSelect";
import CustomInput from "../../../../components/shared/CustomInput/CustomInput";
import {
  useGetParameters,
  useGetUnitsByParameter,
} from "../../../../app/hooks/useParameters";
import { useGetApplicationTypes } from "../../../../app/hooks/useSites";

const initState = {
  idParam: -1,
  params: "",
  idAsset: -1,
  asset: "",
  idUnit: -1,
  unit: "",
  makeupWater: "",
  feedWater: "",
  blowdownWater: "",
  condensateReturn: "",
  minLimit: "",
  maxLimit: "",
};
export default function AddManualEntryModal({ show, setShow, onAddParameter }) {
  const [parameter, setParameter] = useState(initState);
  const [unitInitialVal, setUnitInitialVal] = useState(-1);

  const { data: parameters } = useGetParameters();
  const { data: applications } = useGetApplicationTypes();
  const { data: units } = useGetUnitsByParameter(parameter?.idParam || 0, {
    enabled: parameter?.idParam || 0 > 0, // Solo ejecuta el fetch si selectedCountry > 0
  });

  // Opciones select parametros
  const parametersOptions = useMemo(() => {
    if (parameters && parameters?.length > 0) {
      return parameters.map((parameterData) => ({
        label: parameterData?.label || "",
        value: parameterData?.id || -1,
      }));
    } else {
      return [];
    }
  }, [parameters]);
  // Opciones select parametros
  const applicationsOptions = useMemo(() => {
    if (applications && applications?.length > 0) {
      return applications.map((applicationData) => ({
        label: applicationData.name || "",
        value: applicationData.id || -1,
      }));
    } else {
      return [];
    }
  }, [applications]);

  // Opciones select Units
  const unitsOptions = useMemo(() => {
    if (units && units?.length > 0) {
      return units.map((unit) => ({
        label: unit?.label || "",
        value: unit?.id || -1,
      }));
    } else {
      return [];
    }
  }, [units]);

  useEffect(() => {
    setUnitInitialVal(-1);
  }, [unitsOptions]);

  const buttonDisabled = useMemo(() => {
    return parameter.params == "";
  }, [parameter]);

  const handleChangeSelect = useCallback((type, value) => {
    setParameter((prevParameter) => ({
      ...prevParameter,
      ...(type === "params"
        ? { idParam: value?.[0]?.value ?? -1, params: value?.[0]?.label ?? "" }
        : type === "unit"
        ? { idUnit: value?.[0]?.value ?? -1, unit: value?.[0]?.label ?? "" }
        : type === "asset"
        ? { idAsset: value?.[0]?.value ?? -1, asset: value?.[0]?.label ?? "" }
        : {
            [type]: value?.[0]?.value ?? "",
          }),
    }));
  }, []);

  const handleChangeInput = useCallback((type, value) => {
    setParameter((prevParameter) => ({
      ...prevParameter,
      [type]: value ?? "",
    }));
  }, []);

  const addParameter = () => {
    onAddParameter(parameter);
    setShow(false);
  };

  useEffect(() => {
    setParameter(initState);
  }, [show]);

  return (
    <Modal
      title="New Parameter"
      subtitle="Add parameter"
      show={show}
      setShow={setShow}
      buttonDisabled={buttonDisabled}
      onClickButton={addParameter}
    >
      <div className={`${styles.addParameter}`}>
        {show ? (
          <div className={styles.addParameterContainer}>
            <CustomSelect
              initValue=""
              options={parametersOptions}
              onChange={(e) => handleChangeSelect("params", e)}
              label="Parameter"
              labelPosition="left"
            />
            <CustomSelect
              initValue=""
              options={unitsOptions}
              onChange={(e) => handleChangeSelect("unit", e)}
              label="Unit"
              labelPosition="left"
            />
            {/* <CustomSelect
              initValue=""
              options={applicationsOptions}
              onChange={(e) => handleChangeSelect("asset", e)}
              label="Applications"
              labelPosition="left"
            /> */}
            <CustomInput
              initValue={parameter.minLimit}
              type="number"
              onChange={(value) => handleChangeInput("minLimit", value)}
              name="min"
              style="secondary"
              label="Min. Limit"
              labelPosition="left"
            />
            <CustomInput
              initValue={parameter.maxLimit}
              type="number"
              onChange={(value) => handleChangeInput("maxLimit", value)}
              name="max"
              style="secondary"
              label="Max. Limit"
              labelPosition="left"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
}
