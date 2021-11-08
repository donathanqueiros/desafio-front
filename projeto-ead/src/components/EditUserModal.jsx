import React, { useEffect, useState } from "react";
import { Input, Button, Modal, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import "../assets/styles/modal.scss";

export default ({ show, user, onSubmit, closeModal }) => {
  const [userModal, setUserModal] = useState({});
  const onUserChange = (e) =>
    setUserModal({ ...userModal, [e.target.name]: e.target.value });
  const [form] = useForm();

  useEffect(() => {
    setUserModal(user);
  }, [user]);

  const handleClick = () => {
    onSubmit(userModal);
  };
  return (
    <>
      <Modal
        visible={show}
        title="Editar informações"
        onCancel={closeModal}
        footer={[
          <Button onClick={closeModal}>Cancelar</Button>,
          <Button
            onClick={handleClick}
            htmlType="submit"
            type="primary"
            loading={false}
          >
            Salvar
          </Button>,
        ]}
      >
        <Form
          noValidate={false}
          layout={"vertical"}
          form={form}
          initialValues={{
            size: "large",
          }}
          size={"large"}
        >
          <Form.Item required label="Nome">
            <Input
              required
              placeholder="Nome"
              name="name"
              value={userModal.name}
              onChange={onUserChange}
            />
          </Form.Item>
          <Form.Item required label="E-mail">
            <Input
              placeholder="Email"
              name="email"
              value={userModal.email}
              onChange={onUserChange}
            />
          </Form.Item>
          <Form.Item required label="Telefone">
            <Input
              placeholder="Telefone"
              name="phone"
              value={userModal.phone}
              onChange={onUserChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
