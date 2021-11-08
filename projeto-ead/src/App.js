import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Input,
  Badge,
  Avatar,
  Row,
  Col,
  Image,
  Dropdown,
  Button,
} from "antd";
import "./App.scss";
import {
  DesktopOutlined,
  AppstoreFilled,
  MessageFilled,
  DownOutlined,
  SearchOutlined,
  BellOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import logo from "./assets/images/logo.svg";
import UserService from "./services/UserService.js";
import PainelComponent from "./components/PainelComponent";
import useWindowDimensions from "./hooks/useWindowDimensions";
const { Header, Content, Sider } = Layout;

function App() {
  const [inputSearch, setInputSearch] = useState("");
  const [data, setData] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [loadingSearch, setloadingSearch] = useState(false);
  const { width } = useWindowDimensions();

  const [dataCards, setDataCards] = useState({
    totalUsers: 0,
    defaulting: 0,
    nonDefaulting: 0,
    totalCollected: 0,
  });

  const [cards, setCards] = useState([
    {
      title: "Total de Clientes",
      value: dataCards.totalUsers,
    },
    {
      title: "Clientes inadimplentes",
      value: dataCards.defaulting,
    },
    {
      title: "Clientes adimplentes",
      value: dataCards.nonDefaulting,
    },
    {
      title: "Total Arrecadado",
      value: dataCards.totalCollected,
    },
  ]);

  useEffect(() => {
    attData();
  }, []);

  function attData() {
    UserService.getAll()
      .then((res) => {
        var dataRes = res.data;
        setData(dataRes);
        setDataUsers(dataRes.users);
      })
      .catch(console.log)
      .finally(() => setloadingSearch(false));
  }

  useEffect(() => {
    setloadingSearch(true);
    if (inputSearch.length > 0) {
      UserService.getByNameEmail(inputSearch)
        .then((res) => {
          var data = res.data;

          console.log(data);
          if (JSON.stringify(data).includes("msg")) {
            setDataUsers([]);
          } else {
            setDataUsers(data.search);
          }
        })
        .catch(console.log)
        .finally(() => setloadingSearch(false));
    } else {
      UserService.getAll()
        .then((res) => {
          var dataRes = res.data;
          setData(dataRes);
          setDataUsers(dataRes.users);
        })
        .catch(console.log)
        .finally(() => setloadingSearch(false));
    }
  }, [inputSearch]);

  useEffect(() => {
    attCards();
  }, [data, dataUsers]);

  const attCards = () => {
    var totalUsers = data.total;
    var inativo = dataUsers.filter((user) => user.status === "1").length;
    var ativo = dataUsers.filter((user) => user.status === "0").length;
    var totalArrecadado = dataUsers
      .filter((u) => u.status === "0")
      .reduce((pv, cv) => {
        var valor = pv + Number(cv.amount);
        return valor;
      }, 0);

    setDataCards({
      totalUsers: totalUsers,
      defaulting: inativo,
      nonDefaulting: ativo,
      totalCollected: totalArrecadado,
    });

    setCards([
      {
        title: "Total de Clientes",
        value: dataCards.totalUsers,
      },
      {
        title: "Clientes inadimplentes",
        value: dataCards.defaulting,
      },
      {
        title: "Clientes adimplentes",
        value: dataCards.nonDefaulting,
      },
      {
        title: "Total Arrecadado",
        value: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(dataCards.totalCollected),
      },
    ]);
  };

  const menu = (
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key="1" icon={<AppstoreFilled className="painel-icon" />}>
        Painel
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined className="painel-icon" />}>
        Configurações
      </Menu.Item>
      <div className="suport-div">
        <MessageFilled />
        <span>Suporte</span>
      </div>
    </Menu>
  );

  const Web = (props) => {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200}>
          <div className="logo d-flex justify-content-center align-items-center">
            <Image preview={false} src={logo} height={"100%"} />
          </div>
          {menu}
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Content>
              <Row>
                <Col md={16} lg={18}>
                  <Input
                    className="inputSearch"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    size="large"
                    placeholder="Busque por clientes"
                    style={{ width: "100%" }}
                    prefix={<SearchOutlined />}
                  />
                </Col>
                <Col
                  md={8}
                  lg={6}
                  className="d-flex justify-content-end align-items-center"
                >
                  <Badge
                    style={{ alignSelf: "flex-start" }}
                    dot={true}
                    offset={[-10, 8]}
                  >
                    <Avatar
                      className="notification-icon"
                      shape="circle"
                      icon={<BellOutlined />}
                      size="large"
                    />
                  </Badge>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.antgroup.com"
                          >
                            1st menu item
                          </a>
                        </Menu.Item>
                        <Menu.Item icon={<DownOutlined />} disabled>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.aliyun.com"
                          >
                            2nd menu item (disabled)
                          </a>
                        </Menu.Item>
                        <Menu.Item disabled>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.luohanacademy.com"
                          >
                            3rd menu item (disabled)
                          </a>
                        </Menu.Item>
                        <Menu.Item danger>a danger item</Menu.Item>
                      </Menu>
                    }
                  >
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Avatar
                        style={{ marginLeft: "16px" }}
                        size="large"
                        src={dataUsers[0]?.photo_url}
                      />
                      <DownOutlined
                        style={{
                          color: "black",
                          fontSize: "12px",
                          paddingLeft: "4px",
                        }}
                      />
                    </a>
                  </Dropdown>
                </Col>
              </Row>
            </Content>
          </Header>
          <Content style={{ padding: "16px 16px", backgroundColor: "#f5f5f5" }}>
            {props}
          </Content>
        </Layout>
      </Layout>
    );
  };

  const Mobile = (props) => {
    return (
      <Layout style={{ width: "100%" }} className="layout">
        <header style={{ backgroundColor: "white", marginBottom: "30px" }}>
          <Content>
            <Row
              style={{ height: "100px", padding: "0px 24px" }}
              className="logo d-flex justify-content-between align-items-center"
            >
              <div></div>
              <div>
                <Image preview={false} src={logo} height={"100%"} />
              </div>

              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.antgroup.com"
                      >
                        Painel
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.aliyun.com"
                      >
                        Configurações
                      </a>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomCenter"
              >
                <Button
                  style={{ width: "50px", height: "50px" }}
                  icon={<MenuOutlined />}
                ></Button>
              </Dropdown>
            </Row>
            <Row
              style={{ padding: "8px" }}
              className="  d-flex justify-content-between align-items-center"
            >
              <Col style={{ width: "100px" }} />
              <Col>
                <Input
                  className="inputSearch"
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                  size="large"
                  placeholder="Busque por clientes"
                  style={{ width: "100%" }}
                  prefix={<SearchOutlined />}
                />
              </Col>
              <Col className="d-flex justify-content-end ">
                <Badge dot={true} offset={[-10, 8]}>
                  <Avatar
                    className="notification-icon"
                    shape="circle"
                    icon={<BellOutlined />}
                    size="large"
                  />
                </Badge>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.antgroup.com"
                        >
                          1st menu item
                        </a>
                      </Menu.Item>
                      <Menu.Item icon={<DownOutlined />} disabled>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.aliyun.com"
                        >
                          2nd menu item (disabled)
                        </a>
                      </Menu.Item>
                      <Menu.Item disabled>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.luohanacademy.com"
                        >
                          3rd menu item (disabled)
                        </a>
                      </Menu.Item>
                      <Menu.Item danger>a danger item</Menu.Item>
                    </Menu>
                  }
                >
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Avatar
                      style={{ marginLeft: "16px" }}
                      size="large"
                      src={dataUsers[0]?.photo_url}
                    />
                    <DownOutlined
                      style={{
                        color: "black",
                        fontSize: "12px",
                        paddingLeft: "4px",
                      }}
                    />
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </Content>
        </header>
        <Content style={{ boxSizing: "border-box", padding: "8px" }}>
          {props}
        </Content>
      </Layout>
    );
  };

  const Main = () => {
    return (
      <PainelComponent
        attData={() => attData()}
        cards={cards}
        users={dataUsers}
        search={inputSearch.length > 0}
        loadingSearch={loadingSearch}
      />
    );
  };

  return <>{width >= 992 ? Web(Main()) : Mobile(Main())}</>;
}

export default App;
