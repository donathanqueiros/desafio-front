import { Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import CardComponent from "./CardComponent";
import Title from "./Title";

export default ({ dataCards, ...props }) => {
  return (
    <Content
      style={ props.style }
      className={"visao-geral " + props.className}
    >
      <Title style={{ marginBottom: "24px" }} value="Visão geral" />
      <Row>
        {dataCards.map((card, index) => (
          <CardComponent key={index} title={card.title} value={card.value} />
        ))}
      </Row>
    </Content>
  );
};
