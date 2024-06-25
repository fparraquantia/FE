"use client";

import CustomModal from "@/app/_components/CustomModal/CustomModal";
import { validateMessages } from "@/app/_helpers/validationsAnt";
import { useGetGroups } from "@/app/_pages/AccessProfile/network/getProfiles";
import { useInviteUser } from "@/app/_pages/UserSettings/network/inviteUser";
import { Form, Input, Select } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";

import styles from "./ModalAddUser.module.scss";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

export interface ModalAddUserProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function ModalAddUser({ show, setShow }: ModalAddUserProps) {
  const { data: profilesData, isLoading: loadingProfile } = useGetGroups();
  const { mutate: inviteUser, isPending: addingUser } = useInviteUser();
  const [form] = Form.useForm<{ group_id: string; email: string }>();

  const buttonHandler = () => {
    form.submit();
  };

  const onFinishSuccess = (value: { group_id: string; email: string }) => {
    inviteUser(value, {
      onSuccess: () => setShow(false),
    });
  };

  // Manejar el estado cuando el modal es cerrado
  useEffect(() => {
    if (!show) {
      form.resetFields();
    }
  }, [show]);

  return (
    <CustomModal
      isLoadingButton={addingUser}
      title="New User"
      subtitle="Add a new user"
      type="add"
      show={show}
      setShow={setShow}
      onClickButton={buttonHandler}>
      <div className={styles.modalUser}>
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
            name="group_id">
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
}
