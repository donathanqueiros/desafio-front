import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import UserService from "../services/UserService";
import DeleteUsersModal from "./DeleteUsersModal";
import EditUserModal from "./EditUserModal";
import TableUser from "./TableUser";
import Title from "./Title";
import isDescendant from "../utils/isDescendant.js";
import useMessage from "../hooks/useMessage";

export default ({ attData, dataUsers, ...props }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState({});
  const { width } = useWindowDimensions();
  const { sucess, error } = useMessage();

  const saveUser = (user) => {
    const userSend = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    console.log(userSend);

    UserService.editUser(userSend)
      .then((res) => {
        console.log(res);
        setShowEditModal(false);
        attData();
        sucess("Editado com sucesso");
      })
      .catch(() => {
        error("erro ao editar");
      });
  };

  const deleteUser = (id) => {
    UserService.deleteUser(id)
      .then((res) => {
        attData();
        setSelectedRowKeys(selectedRowKeys.filter((v) => id !== v));
        sucess("Deletado com sucesso");
      })
      .catch(() => {
        error("erro ao editar");
      });
  };

  const deleteUsers = () => {
    UserService.deleteUsers(selectedRowKeys)
      .then((res) => {
        setShowDeleteModal(false);
        setSelectedRowKeys([]);
        attData();
        sucess("Deletados com sucesso");
      })
      .catch(() => {
        error("erro ao editar");
      });
  };

  const columns = [
    {
      title: "avatar",
      dataIndex: "photo_url",
      key: "photo_url",
      render: (photo_url) => <Avatar size="large" src={photo_url} />,
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Valor",
      dataIndex: "amount",
      key: "amount",
      render: (value) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value);
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        Number(status) === 0 ? (
          "Adimplentes"
        ) : (
          <span style={{ color: "red" }}>Inadimplentes</span>
        ),
    },
    {
      title: "delete",
      dataIndex: "id",
      key: "delete-button",
      width: "80px",
      render: (id) =>
        selectedRowKeys.includes(id) ? (
          <div className="column-delete-row">
            <Button
              ant-click-animating-without-extra-node="false"
              icon={<DeleteOutlined />}
              name="button-delete"
              onClick={() => deleteUser(id)}
            />
          </div>
        ) : null,
    },
  ];

  const deviceColumns = [
    {
      title: "User Data",
      render: (record, key, index) => {
        return (
          <Row
            className="d-flex justify-content-center align-items-center"
            gutter={10}
          >
            <Col xs={4} sm={4} md={4} lg={2}>
              <Avatar size="large" src={record.photo_url} />
            </Col>
            <Col xs={20} sm={20} md={20} lg={4}>
              <span>{record.name}</span>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <span>{record.email}</span>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <span>{record.phone}</span>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(record.amount)}
              </span>
            </Col>
            <Col xs={20} sm={20} md={20}>
              {Number(record.status) === 0 ? (
                "Adimplentes"
              ) : (
                <span style={{ color: "red" }}>Inadimplentes</span>
              )}
            </Col>
            <Col xs={4} sm={4} md={4}>
              {selectedRowKeys.includes(record.id) ? (
                <div className="column-delete-row">
                  <Button
                    ant-click-animating-without-extra-node="false"
                    icon={<DeleteOutlined />}
                    name="button-delete"
                    onClick={() => deleteUser(record.id)}
                  />
                </div>
              ) : null}
            </Col>
          </Row>
        );
      },
    },
  ];

  const clickRowHandler = (record, e) => {
    setUser(record);
    const { name } = e.target;
    if (
      name !== "button-delete" &&
      !isDescendant(document.getElementsByName("button-delete")[0], e.target)
    ) {
      setShowEditModal(true);
    }
  };

  return (
    <Content>
      <Title value="Clientes Cadastrados" />
      <TableUser
        showCheckBox
        onClickRow={clickRowHandler}
        onClickDeleteUsers={() => {
          setShowDeleteModal(true);
        }}
        dataUsers={dataUsers}
        columns={width >= 992 ? columns : deviceColumns}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: (value) => setSelectedRowKeys(value),
          setSelectedRowKeys: setSelectedRowKeys,
        }}
      />
      <EditUserModal
        user={user}
        closeModal={() => setShowEditModal(false)}
        show={showEditModal}
        onSubmit={saveUser}
      />
      <DeleteUsersModal
        closeModal={() => setShowDeleteModal(false)}
        show={showDeleteModal}
        onSubmit={deleteUsers}
      />
    </Content>
  );
};
