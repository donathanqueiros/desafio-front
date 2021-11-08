import { Avatar, Col, Row, Spin } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import TableUser from "./TableUser";

export default ({ dataUsers, loadingSearch, ...props }) => {
  const [totalUsersFound, setTotalUsersFound] = useState(0);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setTotalUsersFound(dataUsers.length);
  }, [dataUsers]);

  const columns = [
    {
      title: "avatar",
      dataIndex: "photo_url",
      render: (photo_url) => <Avatar size="large" src={photo_url} />,
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
    },
    {
      title: "Valor",
      dataIndex: "amount",
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
      render: (status) =>
        Number(status) === 0 ? (
          "Adimplentes"
        ) : (
          <span style={{ color: "red" }}>Inadimplentes</span>
        ),
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
            <Col xs={12} sm={8} md={8}>
              <span>{record.phone}</span>
            </Col>
            <Col xs={12} sm={8} md={8}>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(record.amount)}
              </span>
            </Col>
            <Col xs={24} sm={8} md={8}>
              {Number(record.status) === 0 ? (
                "Adimplentes"
              ) : (
                <span style={{ color: "red" }}>Inadimplentes</span>
              )}
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <Content>
      {loadingSearch ? (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Spin size="large" />
          <h3>buscando</h3>
        </div>
      ) : (
        <>
          <h5>
            Foram encontrados <b>{totalUsersFound} registros</b>
          </h5>
          <TableUser
            dataUsers={dataUsers}
            columns={width >= 992 ? columns : deviceColumns}
          />
        </>
      )}
    </Content>
  );
};
