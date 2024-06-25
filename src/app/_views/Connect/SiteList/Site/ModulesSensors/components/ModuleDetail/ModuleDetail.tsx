"use client";
import CustomModal from "@/app/_components/CustomModal/CustomModal";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./ModuleDetail.module.scss";
import { Button, CircularProgress } from "@mui/material";
import { Error } from "@mui/icons-material";
import { Input, Select } from "antd";
import CustomLabel from "@/app/_components/CustomLabel/CustomLabel";
import { useGetModule, useUpdateModule } from "@/app/_hooks/useModuleSensor";

interface ModuleDetailProps {
  moduleId: number;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function ModuleDetail({ moduleId, show, setShow }: ModuleDetailProps) {
  const [inputs, setInputs] = useState<{
    name: string;
    brand: string;
    model: string;
  }>({ name: "", brand: "", model: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(false);
  }, [inputs]);

  // Detalle Módulo
  const {
    data: moduleData,
    isLoading: isLoadingModule,
    isError: errorModule,
  } = useGetModule(moduleId);

  // Editar Módulo
  const { mutate: updateModule, isPending: loadingUpdate } = useUpdateModule();

  useEffect(() => {
    if (!show) {
      setInputs({
        name: moduleData?.[0].name || "",
        brand: moduleData?.[0].brand || "",
        model: moduleData?.[0].model || "",
      });
    }
    setButtonDisabled(true);
  }, [show, moduleData]);

  const onAccept = useCallback(() => {
    updateModule(
      { moduleId, payload: inputs },
      {
        onSettled: () => {
          setShow(false);
        },
      }
    );
  }, [updateModule, inputs, setShow, moduleId]);
  return (
    <CustomModal
      show={show}
      setShow={setShow}
      title={"Selection Detail"}
      subtitle={"Module information"}
      type="edit"
      onClickButton={onAccept}
      buttonDisabled={buttonDisabled}
      isLoadingButton={loadingUpdate}
    >
      <div className={styles.container}>
        {isLoadingModule ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : errorModule ? (
          <div className={styles.loading}>
            <Error />
            <span>Module could not be loaded</span>
          </div>
        ) : (
          <>
            <div className={styles.containerInput}>
              <CustomLabel label="ID">
                <Input
                  style={{
                    width: "100%",
                  }}
                  value={moduleData?.[0].id || ""}
                  disabled
                />
              </CustomLabel>
            </div>

            <div className={styles.containerInput}>
              <CustomLabel label="Name">
                <Input
                  style={{
                    width: "100%",
                  }}
                  defaultValue={inputs.name || ""}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      name: e.target.value || "",
                    }))
                  }
                />
              </CustomLabel>
            </div>

            <div className={styles.containerInput}>
              <CustomLabel label="Brand">
                <Select
                  style={{
                    width: "100%",
                  }}
                  options={[
                    { value: "Kurita BX", label: "Kurita BX" },
                    { value: "Kurita DX", label: "Kurita DX" },
                    { value: "Kurita ZX", label: "Kurita ZX" },
                    { value: "Microcom", label: "Microcom" },
                  ]}
                  defaultValue={inputs.brand || ""}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      brand: e,
                    }))
                  }
                />
              </CustomLabel>
            </div>

            <div className={styles.containerInput}>
              <CustomLabel label="Model">
                <Select
                  style={{
                    width: "100%",
                  }}
                  options={[
                    { value: "M102", label: "M102" },
                    { value: "M103", label: "M103" },
                    { value: "M104", label: "M104" },
                  ]}
                  defaultValue={inputs.model || ""}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      model: e,
                    }))
                  }
                />
              </CustomLabel>
            </div>

            <div className={styles.containerInput}>
              <CustomLabel label="Device">
                <Input
                  style={{
                    width: "100%",
                  }}
                  value={moduleData?.[0].device || ""}
                  disabled
                />
              </CustomLabel>
            </div>

            <div className={styles.containerInput}>
              <CustomLabel label="Installation Date">
                <Input
                  style={{
                    width: "100%",
                  }}
                  disabled
                />
              </CustomLabel>
            </div>

            <div className={styles.containerInput}>
              <CustomLabel label="Communication">
                <Input
                  style={{
                    width: "100%",
                  }}
                  value={moduleData?.[0].communication || ""}
                  disabled
                />
              </CustomLabel>
            </div>

            <div className={styles.containerInput}>
              <CustomLabel label="Status">
                <Button
                  sx={{ width: 200, textTransform: "uppercase" }}
                  disabled
                  variant="contained"
                  color={
                    moduleData?.[0].status == "CONNECTED" ? "success" : "error"
                  }
                >
                  {moduleData?.[0].status}
                </Button>
              </CustomLabel>
            </div>
          </>
        )}
      </div>
    </CustomModal>
  );
}
