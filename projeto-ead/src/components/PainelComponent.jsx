import { Content } from "antd/lib/layout/layout";
import React from "react";
import RegisteredUsersComponent from "./RegisteredUsersComponent";
import SearchPainelComponent from "./SearchPainelComponent";
import OverviewComponent from "./OverviewComponent";

export default ({ attData, users, cards, search, loadingSearch }) => {
  return (
    <Content>
      {!search ? (
        <>
          <OverviewComponent
            style={{ marginBottom: "30px" }}
            dataCards={cards || [{ title: "titulo", value: "valor" }]}
          />

          <RegisteredUsersComponent attData={attData} dataUsers={users} />
        </>
      ) : (
        <SearchPainelComponent
          dataUsers={users}
          loadingSearch={loadingSearch}
        />
      )}
    </Content>
  );
};
