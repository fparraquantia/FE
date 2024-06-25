"use client";

import CustomModal from "@/app/_components/CustomModal/CustomModal";
import { validateMessages } from "@/app/_helpers/validationsAnt";
import { useAddProfile } from "@/app/_pages/AccessProfile/network/addProfile";
import { useEditProfile } from "@/app/_pages/AccessProfile/network/editProfile";
import { useGetGroups } from "@/app/_pages/AccessProfile/network/getProfiles";
import { CircularProgress } from "@mui/material";
import { Form, Input } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";

import styles from "./ModalAddProfile.module.scss";

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

export interface ModalAddProfileProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  idProfile?: string;
}

export function ModalAddProfile({ show, setShow, idProfile = "" }: ModalAddProfileProps) {
  const { mutate: addProfile, isSuccess: successAdd, isPending: addingProfile } = useAddProfile();
  const { mutate: editProfile, isSuccess: successEdit, isPending: updatingProfile } = useEditProfile({ groupId: idProfile });
  const { data: profilesData, isLoading: loadingProfile, isError } = useGetGroups();
  const [form] = Form.useForm<{ name: string; description: string }>();

  useEffect(() => {
    if (show && !!idProfile) {
      const profileData = profilesData?.find((profileD) => profileD.id == idProfile);
      const initData: { name: string; description: string } = {
        name: profileData?.name ?? "",
        description: profileData?.description ?? "",
      };
      form.setFieldsValue(initData);
    }
  }, [form, show, profilesData]);

  useEffect(() => {
    if (successAdd || successEdit) {
      setShow(false);
    }
  }, [successAdd, successEdit]);

  const buttonHandler = () => {
    form.submit();
  };

  const onFinishSuccess = (value: { name: string; description: string }) => {
    // EDIT
    if (idProfile) {
      editProfile({ ...value });
    }
    // CREATE
    else {
      addProfile({ ...value, mailNickname: "testsomething" });
    }
    setShow(false);
  };

  // Manejar el estado cuando el modal es cerrado
  useEffect(() => {
    if (!show && form) {
      form.resetFields();
    }
  }, [show, form]);

  return (
    <CustomModal
      isLoadingButton={addingProfile || updatingProfile}
      title={"Profiles"}
      subtitle={idProfile ? "Edit profile" : "Add profile"}
      type={idProfile ? "edit" : "add"}
      show={show}
      setShow={setShow}
      onClickButton={buttonHandler}>
      <div className={styles.modalProfile}>
        {show &&
          (loadingProfile && !!idProfile ? (
            <div className={styles.modalProfileLoading}>
              <CircularProgress />
            </div>
          ) : isError ? (
            <div>Error loading profiles data.</div>
          ) : (
            <Form
              form={form}
              {...formItemLayout}
              onFinish={onFinishSuccess}
              name="appForm"
              validateMessages={validateMessages}
              style={{
                width: 550,
              }}>
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
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                  },
                ]}>
                <Input />
              </Form.Item>
            </Form>
          ))}
      </div>
    </CustomModal>
  );
}
