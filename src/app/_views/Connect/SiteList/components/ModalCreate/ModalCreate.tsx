"use client";

import CustomModal from "@/app/_components/CustomModal/CustomModal";
import { formatDataToCreate, formatDataToEdit } from "@/app/_helpers/sites";
import { useCreateSite, useGetSite, useUpdateSite } from "@/app/_hooks/useSites";
import { Application, UpdateCreateSite } from "@/app/_types/endpoint/Site";
import { CircularProgress } from "@mui/material";
import { Form } from "antd";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

import GeneralInformation from "../GeneralInformation/GeneralInformation";
import NewApplication from "../NewApplication/NewApplication";
import styles from "./ModalCreate.module.scss";

export interface ModalCreateProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  id: number;
}

export function ModalCreate({ show, setShow, id }: ModalCreateProps) {
  const { mutate: createMutate, isSuccess: successCreate, isPending: addingUser } = useCreateSite();
  const { mutate: updateMutate, isSuccess: successUpdate, isPending: updatingUser } = useUpdateSite();

  const [form] = Form.useForm<UpdateCreateSite>();

  useEffect(() => {
    if (successCreate || successUpdate) {
      setShow(false);
    }
  }, [successCreate, successUpdate]);

  const { data: siteData, isLoading, isError } = useGetSite(id);

  const buttonHandler = () => {
    form.submit();
  };

  const onFinishSuccess = (value: UpdateCreateSite) => {
    if (type === "add") {
      const createData = formatDataToCreate(value);
      console.log("createData", createData);
      createMutate(createData);
    } else if (type === "edit" && siteData) {
      const editData = formatDataToEdit(value, siteData);
      console.log("editData", editData);
      updateMutate({ siteId: siteData?.id || 0, payload: editData });
    }
  };

  const [selectedApplication, setSelectedApplication] = useState(-1);

  // Manejar el estado cuando el modal es cerrado
  useEffect(() => {
    if (!show) {
      form.resetFields();
      setSelectedApplication(-1);
    }
  }, [show]);

  // Determinar si estamos en modo de edición o creación basado en si tenemos datos válidos
  const type = useMemo(() => {
    return id > 0 ? "edit" : "add";
  }, [id, siteData]);
  return (
    <CustomModal
      title={type === "add" ? "New Site" : "Edit Site Information"}
      type={type}
      isLoadingButton={addingUser || updatingUser}
      show={show}
      setShow={setShow}
      onClickButton={buttonHandler}>
      <div className={styles.modalCreate}>
        {show &&
          (isLoading ? (
            <div className={styles.modalCreateLoading}>
              <CircularProgress />
            </div>
          ) : isError && type == "edit" ? (
            <div>Error loading site data.</div>
          ) : (
            <Form.Provider
              onFormFinish={(name, { values, forms }) => {
                if (name === "appForm") {
                  const { informationForm, appForm } = forms;
                  let applications: Application[] = informationForm.getFieldValue("applications") || [];
                  const index = applications.findIndex((app) => app?.type === selectedApplication);
                  const dataApp = values as Application;
                  if (index !== -1) {
                    applications[index] = dataApp;
                  } else {
                    applications = [...applications, dataApp];
                  }

                  // Actualiza el array de aplicaciones en el formulario
                  informationForm.setFieldsValue({ applications });
                  appForm.resetFields();
                  setSelectedApplication(-1);
                } else {
                  onFinishSuccess(values as UpdateCreateSite);
                }
              }}>
              <div className={styles.modalCreateContainer}>
                <div className={styles.modalCreateContainerScrollInfo}>
                  <GeneralInformation
                    form={form}
                    siteData={(type == "edit" && siteData) || undefined}
                    selectedApplication={selectedApplication}
                    setSelectedApplication={setSelectedApplication}
                  />
                </div>
                <NewApplication
                  form={form}
                  siteData={(type == "edit" && siteData) || undefined}
                  selectedApplication={selectedApplication}
                />
              </div>
            </Form.Provider>
          ))}
      </div>
    </CustomModal>
  );
}
