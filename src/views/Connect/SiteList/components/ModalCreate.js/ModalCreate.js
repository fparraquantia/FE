import React, { useEffect, useMemo, useState } from "react";
import styles from "./ModalCreate.module.scss";
import Modal from "../../../../../components/shared/Modal/Modal";
import GeneralInformation from "../GeneralInformation/GeneralInformation";
import NewApplication from "../NewApplication/NewApplication";
import {
  useCreateSite,
  useGetSite,
  useUpdateSite,
} from "../../../../../app/hooks/useSites";
import {
  formatDataToCreate,
  formatDataToEdit,
} from "../../../../../helpers/mappers/sites";

export default function ModalCreate({ show, setShow, id }) {
  const {
    mutate: createMutate,
    isError: errorCreate,
    isSuccess: successCreate,
  } = useCreateSite();
  const {
    mutate: updateMutate,
    isError: errorUpdate,
    isSuccess: successUpdate,
  } = useUpdateSite();

  useEffect(() => {
    if (successCreate || successUpdate) {
      setShow(false);
    }
  }, [successCreate, successUpdate]);

  const { data: siteData, isLoading, isError } = useGetSite(id);

  const buttonHandler = () => {
    if (type === "add") {
      const createData = formatDataToCreate(createSiteData);
      createMutate(createData);
    } else if (type === "edit") {
      const editData = formatDataToEdit(siteData, createSiteData);
      console.log("ID________:", siteData?.id || 0);
      console.log("DATA______:", editData);
      updateMutate({ id: siteData?.id || 0, updateData: editData });
    }
  };

  const [selectedApplication, setSelectedApplication] = React.useState(-1);
  const [createSiteData, setCreateSiteData] = React.useState({});
  const buttonDisabled = useMemo(
    () => !createSiteData?.name || createSiteData?.name == "",
    [createSiteData?.name]
  );

  // Manejar el estado cuando el modal es cerrado
  React.useEffect(() => {
    if (!show) {
      setCreateSiteData({});
      setSelectedApplication(-1);
    }
  }, [show]);

  // Determinar si estamos en modo de edición o creación basado en si tenemos datos válidos
  const type = useMemo(() => {
    return id > 0 && siteData && siteData?.id ? "edit" : "add";
  }, [id, siteData]);

  return (
    <Modal
      title={type === "add" ? "New Site" : "Edit Site Information"}
      type={type}
      show={show}
      setShow={setShow}
      buttonDisabled={buttonDisabled}
      onClickButton={buttonHandler}
    >
      <div className={styles.modalCreate}>
        {show &&
          (isLoading && type == "edit" ? (
            <div>Cargando...</div>
          ) : isError && type == "edit" ? (
            <div>Error al cargar los datos del sitio.</div>
          ) : errorCreate ? (
            <div>Error al crear el sitio.</div>
          ) : errorUpdate ? (
            <div>Error al editar el sitio.</div>
          ) : (
            <div className={styles.modalCreateContainer}>
              <div className={styles.modalCreateContainerScrollInfo}>
                <GeneralInformation
                  siteData={(type == "edit" && siteData) || {}}
                  selectedApplication={selectedApplication}
                  setSelectedApplication={setSelectedApplication}
                  createSiteData={createSiteData}
                  setCreateSiteData={setCreateSiteData}
                />
              </div>
              <NewApplication
                siteData={(type == "edit" && siteData) || {}}
                selectedApplication={selectedApplication}
                setSelectedApplication={setSelectedApplication}
                createSiteData={createSiteData}
                setCreateSiteData={setCreateSiteData}
              />
            </div>
          ))}
      </div>
    </Modal>
  );
}
