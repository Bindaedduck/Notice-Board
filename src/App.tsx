import {  Layout, Breadcrumb, Menu, theme } from 'antd';
import type {  MenuProps  } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './App.css';
import React from 'react';
import Table from './components/Table.tsx';

//and design 관련
const { Header, Footer, Content, Sider } = Layout;

dayjs.extend(customParseFormat);

const topItems: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const sideItems: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

function App() {
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
        <Layout>
          {/* Header */}
          <Header className="header">
            <Menu className="header__menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={topItems} />
          </Header>

          {/* Content */}
          <div style={{ padding: '0 48px' }}>
            <Breadcrumb className="breadcrumb"
              items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]} />

            <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
              {/* Sider */}
              <Sider style={{ background: colorBgContainer }} width={200}>
                <Menu className="sider__menu"
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  items={sideItems} />
              </Sider>

              <Content className="content">
                <Table />
              </Content>
            </Layout>
          </div>

          {/* Footer */}
          <Footer style = {{background: borderRadiusLG, textAlign: "center"}}/>
        </Layout>
  )
}

export default App;