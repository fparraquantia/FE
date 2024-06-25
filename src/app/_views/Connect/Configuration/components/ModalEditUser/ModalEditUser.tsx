"use client";

import CustomModal from "@/app/_components/CustomModal/CustomModal";
import { validateMessages } from "@/app/_helpers/validationsAnt";
import { useGetGroups } from "@/app/_pages/AccessProfile/network/getProfiles";
import { useEditUser } from "@/app/_pages/UserSettings/network/editUser";
import { useGetUsers } from "@/app/_pages/UserSettings/network/getUsers";
import { CircularProgress } from "@mui/material";
import { Form, Input, Select } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";

import styles from "./ModalEditUser.module.scss";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

export interface ModalEditUserProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  userId: string;
}

interface EditUserForm {
  groupId: string;
  phone?: string;
  mail?: string;
  lastName: string;
  firstName: string;
}

export function ModalEditUser({ show, setShow, userId }: ModalEditUserProps) {
  const { data: users, isLoading: loadingUser } = useGetUsers();
  const { mutate: editUser, isPending: editingUser } = useEditUser({ userId });
  const { data: profilesData, isLoading: loadingProfile } = useGetGroups();
  const [form] = Form.useForm<EditUserForm>();

  useEffect(() => {
    if (show && !!userId && userId != "none") {
      const userData = users?.find((userD) => userD.id == userId);
      console.log(userData?.group.id);
      console.log(profilesData);
      const initData: EditUserForm = {
        groupId: userData?.group.id ?? "",
        firstName: userData?.firstName ?? "",
        lastName: userData?.lastName ?? "",
        phone: userData?.phone ?? "",
        mail: userData?.email ?? "",
      };
      form.setFieldsValue(initData);
    }
  }, [form, show, users]);

  const buttonHandler = () => {
    form.submit();
  };

  const onFinishSuccess = (value: EditUserForm) => {
    if (userId !== "none") {
      editUser(
        { ...value, phone: value.phone ?? null, mail: value.mail ?? null },
        {
          onSuccess: () => setShow(false),
        },
      );
    }
  };

  // Manejar el estado cuando el modal es cerrado
  useEffect(() => {
    if (!show) {
      form.resetFields();
    }
  }, [show]);

  return (
    <CustomModal
      isLoadingButton={editingUser}
      title="Edit User"
      subtitle="Edit user"
      type="edit"
      show={show}
      setShow={setShow}
      onClickButton={buttonHandler}>
      <div className={styles.modalUser}>
        {loadingUser ? (
          <CircularProgress />
        ) : (
          <Form
            form={form}
            {...formItemLayout}
            onFinish={onFinishSuccess}
            name="appForm"
            validateMessages={validateMessages}
            style={{
              minWidth: 550,
            }}>
            <Form.Item
              label="Profile"
              name="groupId"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Select
                placeholder="Select a profile"
                loading={loadingProfile}>
                {profilesData?.map((profileData) => (
                  <Option
                    key={`profile_${profileData.id}`}
                    value={profileData.id}>
                    {profileData.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone">
              <Input />
            </Form.Item>
            <Form.Item
              label="Mail"
              name="mail">
              <Input />
            </Form.Item>
          </Form>
        )}
      </div>
    </CustomModal>
  );
}
