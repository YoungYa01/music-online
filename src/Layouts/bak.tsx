import React from 'react';
import {Layout, Menu, theme} from 'antd';
import Routers from "../routers";
import {useNavigate} from "react-router-dom";

const {Header, Content, Footer} = Layout;

const BaseLayout: React.FC = () => {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  const elements = Routers();

  const navigate = useNavigate();

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: "transparent"
        }}
      >
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={[
            {key: 1, label: 'HOME', onClick: () => navigate('/')},
            {key: 2, label: 'HOME2', onClick: () => navigate('/2')},
            {key: 3, label: 'HOME3', onClick: () => navigate('/3')},
          ]}
          style={{flex: 1, minWidth: 0}}
        />
      </Header>
      <Content style={{padding: '0 48px'}}>
        <div
          style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 'calc(100vh - 150px)',
          }}
        >
          {elements}
        </div>
      </Content>
      <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default BaseLayout;
