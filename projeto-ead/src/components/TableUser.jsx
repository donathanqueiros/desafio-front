import React, { useState } from "react";
import { Table, Row, Col, Checkbox } from "antd";
import "../assets/styles/tableUser.scss";

export default ({
  showCheckBox,
  rowSelection = {},
  dataUsers,
  columns,
  onClickDeleteUsers,
  onClickRow = () => {},
  ...props
}) => {
  const { selectedRowKeys, setSelectedRowKeys } = rowSelection;
  const [checkAll, setCheckAll] = useState(false);

  const onCheckAllChange = (e) => {
    const allUserId = dataUsers.map((u) => u.id);
    setSelectedRowKeys(e.target.checked ? allUserId : []);
    setCheckAll(e.target.checked);
  };

  const setTextPagination = () => {
    try {
      document.getElementsByClassName(
        "ant-pagination-prev"
      )[0].childNodes[0].childNodes[0].textContent = "Anterior";
      document.getElementsByClassName(
        "ant-pagination-next"
      )[0].childNodes[0].childNodes[0].textContent = "Próximo";
    } catch (error) {}
  };

  return (
    <>
      {showCheckBox ? (
        <Row>
          <Col style={{ marginRight: "26px" }} md={6}>
            <Checkbox
              indeterminate={
                selectedRowKeys.length > 0 &&
                selectedRowKeys.length < dataUsers.length
              }
              onChange={onCheckAllChange}
              checked={checkAll}
              style={{
                marginBottom: "8px",
                marginLeft: "8px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Selecionar Todos
            </Checkbox>
          </Col>
          {selectedRowKeys.length > 0 ? (
            <Col>
              <span
                style={{ cursor: "pointer", fontWeight: "600" }}
                onClick={onClickDeleteUsers}
              >
                <u>Excluir Selecionados</u>
              </span>
            </Col>
          ) : null}
        </Row>
        
      ) : null}
      <Table
        id={props.id}
        key={props.key}
        rowKey={(record) => record.id}
        showHeader={false}
        pagination={{
          ...props.pagination,
          pageSize: 10,
          showSizeChanger: false,
          hideOnSinglePage: true,
        }}
        onRow={(record, index) => {
          return {
            onClick: (e) => {
              onClickRow(record, e);
            },
          };
        }}
        rowSelection={showCheckBox ? rowSelection : null}
        columns={columns}
        dataSource={dataUsers}
      />
      {setTextPagination()};
    </>
  );
};
