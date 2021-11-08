import React from "react";
import { Button, Modal } from "antd";

export default ({ show, user, onSubmit, closeModal }) => {
  return (
    <>
      <Modal
        visible={show}
        onCancel={closeModal}
        title="Excluir Usuarios"
        footer={[
          <Button onClick={closeModal}>CANCELAR</Button>,
          <Button onClick={onSubmit}>SIM</Button>,
        ]}
      >
        Tem certeza que deseja remover esses usuarios?
      </Modal>
    </>
  );
};
