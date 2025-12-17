import { Switch, Input, Layout, DatePicker, Breadcrumb, Menu, theme } from 'antd';
import type { GetProps, MenuProps  } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './App.css';
import React, { useState } from 'react';
import Table from './components/Table.tsx';

//and design 관련
const { Search } = Input;
const { Header, Footer, Content, Sider } = Layout;
type SearchProps = GetProps<typeof Input.Search>;

const dateFormat = 'YYYY-MM-DD';
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
  const[showSearchFilter, setShowSearchFilter] = useState(false)
  const searchIsVisible = `search--IsVisible ${ showSearchFilter? 'visible' : 'hidden'}`
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onSwitchChange = () => {
    setShowSearchFilter(!showSearchFilter);
  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
      //여기서 찾은거가지고 테이블 Row필터 걸어서 뿌려주면 될 것 같은데
  }

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
                <div style={{display: 'flex'}}>
                  {/* Search */}
                    <div className={searchIsVisible}>
                      {/* Req ID search */}
                      <Search className="search"
                              placeholder="Req ID"
                              allowClear
                              enterButton="Search"
                              size="large"
                              onSearch={onSearch} />
                      {/* Status search */}
                      <Search className="search"
                              placeholder="Status"
                              allowClear
                              enterButton="search"
                              size="large"
                              onSearch={onSearch} />
                      {/* Start Date search */}
                      <DatePicker className="search__date"
                                  minDate={dayjs('2023-01-01', dateFormat)}
                                  maxDate={dayjs('2025-06-30', dateFormat)} />
                      {/* End Date search */}
                      <DatePicker className="search__date"
                                  minDate={dayjs('2023-01-01', dateFormat)}
                                  maxDate={dayjs('2025-06-30', dateFormat)} />
                    </div>
                  {/* Search filter switch */}
                  <Switch  className="switch" onChange={onSwitchChange} />
                </div>
                
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