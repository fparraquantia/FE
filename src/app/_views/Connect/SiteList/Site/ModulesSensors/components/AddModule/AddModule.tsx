"use client";
import CustomModal from "@/app/_components/CustomModal/CustomModal";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import styles from "./AddModule.module.scss";
import { Input } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import {
  useCheckModuleConnection,
  useGetModules,
  useUpdateModuleWithSite,
} from "@/app/_hooks/useModuleSensor";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Colors } from "@/_styles/variables/colors";
import { LoadingButton } from "@mui/lab";

interface AddModuleProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function AddModule({ show, setShow }: AddModuleProps) {
  const [currentDevice, setCurrentDevice] = useState<string>("");
  const [status, setStatus] = useState<{
    status: "SUCCESS" | "ERROR" | "CONNECT" | "";
    message: string;
  }>({ status: "", message: "" });
  const params = useParams<{ siteId: string }>();
  const searchParams = useSearchParams();
  const sitesIds = searchParams.get("sites-ids");
  const siteId = useMemo(() => {
    const queryParam = Number(sitesIds?.split(",")[0]);
    const idParam = Number(params.siteId);
    return queryParam > 0 ? queryParam : idParam;
  }, [params.siteId, sitesIds]);

  // Módulos
  const { data: modulesData, isLoading: isLoadingModules } =
    useGetModules(siteId);

  const { mutate: checkConnection, isPending: loadingChecking } =
    useCheckModuleConnection(siteId);

  const { mutate: addModule, isPending: loadingAddModule } =
    useUpdateModuleWithSite(siteId);

  const onCheckConnection = () => {
    if (currentDevice) {
      checkConnection(currentDevice, {
        onSuccess: (data) => {
          if (!data.idExists) {
            setStatus({ status: "ERROR", message: "Module ID Not Found" });
          } else if (data.alreadyConnected) {
            setStatus({ status: "ERROR", message: "Module already connected" });
          } else {
            setStatus({ status: "SUCCESS", message: "Success!!" });
          }
        },
        onError: () => {
          setStatus({ status: "ERROR", message: "Module ID Not Found" });
        },
      });
    }
  };

  useEffect(() => {
    if (status.status == "SUCCESS" && currentDevice) {
      addModule(currentDevice, {
        onSuccess: () => {
          setCurrentDevice("");
          setStatus({ status: "", message: "" });
        },
        onError: () => {
          setStatus({
            status: "ERROR",
            message: "Module ID could not have been connected",
          });
        },
      });
    }
  }, [status.status, addModule, currentDevice]);

  useEffect(() => {
    setStatus({ status: "CONNECT", message: "" });
  }, [currentDevice]);

  useEffect(() => {
    setCurrentDevice("");
    setStatus({ status: "", message: "" });
  }, [show]);

  return (
    <CustomModal
      show={show}
      setShow={setShow}
      title={"Connected Modules"}
      subtitle={"Add Module ID"}
      type="add"
      onClickButton={() => setShow(false)}
      isLoadingButton={false}
    >
      <div className={styles.container}>
        {isLoadingModules ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : (
          modulesData?.map((module) => (
            <div key={module.id} className={styles.containerInput}>
              <Input
                placeholder="Module ID"
                disabled
                styles={{ input: { textAlign: "center" } }}
                value={module.device}
              />
              <Button
                sx={{ width: 200, textTransform: "uppercase" }}
                disabled
                variant="contained"
                color={module.status == "CONNECTED" ? "success" : "error"}
              >
                {module.status}
              </Button>
            </div>
          ))
        )}

        {status.status && (
          <div className={styles.containerInput}>
            <Input
              placeholder="Module ID"
              styles={{ input: { textAlign: "center" } }}
              value={currentDevice}
              onChange={(e) => setCurrentDevice(e.target.value)}
            />
            <LoadingButton
              sx={{ width: 200, textTransform: "uppercase" }}
              variant="contained"
              color={
                status.status == "SUCCESS"
                  ? "success"
                  : loadingChecking || status.status == "CONNECT"
                    ? "primary"
                    : status.status == "ERROR"
                      ? "error"
                      : "primary"
              }
              disabled={!currentDevice}
              loading={loadingChecking || loadingAddModule}
              onClick={onCheckConnection}
            >
              {status.status}
            </LoadingButton>
            <span>
              {status.message && status.status == "ERROR" ? status.message : ""}
            </span>
          </div>
        )}
        <div className={styles.containerButton}>
          <IconButton
            size="medium"
            onClick={() => setStatus({ status: "CONNECT", message: "" })}
            disabled={!!status.status}
          >
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
      </div>
    </CustomModal>
  );
}
