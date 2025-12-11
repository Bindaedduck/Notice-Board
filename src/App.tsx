import { Table, FloatButton, Switch, Input, Flex, Layout, DatePicker, Breadcrumb, Menu, theme } from 'antd';
import type { TableColumnsType, TableProps, GetProps, MenuProps  } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './App.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

//and design 관련
const { Search } = Input;
const { Header, Footer, Content, Sider } = Layout;
type SearchProps = GetProps<typeof Input.Search>;

interface DataType {
  reqId: string;
  bizCLS: string;
  idpType: string;
  fileName: string;
  filePath: string;
  page: number;
  status: string;
  startDateTime: Date;
  endDateTime: Date;
}

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

const dateFormat = 'YYYY-MM-DD';
dayjs.extend(customParseFormat);

const columns: TableColumnsType<DataType> = [
  {
    title: 'Req Id',
    dataIndex: 'reqId',
    showSorterTooltip: { target: 'full-header' },
    // filters: [
    //   {
    //     text: 'Joe',
    //     value: 'Joe',
    //   },
    //   {
    //     text: 'Jim',
    //     value: 'Jim',
    //   },
    //   {
    //     text: 'Submenu',
    //     value: 'Submenu',
    //     children: [
    //       {
    //         text: 'Green',
    //         value: 'Green',
    //       },
    //       {
    //         text: 'Black',
    //         value: 'Black',
    //       },
    //     ],
    //   },
    // ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    // sorter: (a, b) => a.name.length - b.name.length,
    //sortDirections: ['descend'],
  },
  {
    title: 'Biz CLS',
    dataIndex: 'bizCLS',
    //defaultSortOrder: 'descend',
  },
  {
    title: 'Idp Type',
    dataIndex: 'idpType',
    defaultSortOrder: 'descend',
  },
  {
    title: 'File Name',
    dataIndex: 'fileName',
  },
  {
    title: 'File Path',
    dataIndex: 'filePath',
  },
  {
    title: 'Page',
    dataIndex: 'page',
    //efaultSortOrder: 'descend',
    //sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    // onFilter: (value, record) => record.address.indexOf(value as string) === 0,
  },
  {
    title: 'Start Date Time',
    dataIndex: 'startDateTime',
  },
   {
    title: 'End Date Time',
    dataIndex: 'endDateTime',
  },
];

function App() {
  const[showSearchFilter, setShowSearchFilter] = useState(false); 
  const searchFilterIsVisible = `search-filter__isVisible ${ showSearchFilter? 'visible' : 'hidden'}`;
  const tableRow = useSelector((state) => { return state.tableRow})
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onSwitchChange = () => {
    setShowSearchFilter(!showSearchFilter);
  };

  const onTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

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
                    <div className={searchFilterIsVisible}>
                      {/* Req ID search */}
                      <Search className="search-filter"
                              placeholder="Req ID"
                              allowClear
                              enterButton="Search"
                              size="large"
                              onSearch={onSearch} />
                      {/* Status search */}
                      <Search className="search-filter"
                              placeholder="Status"
                              allowClear
                              enterButton="search"
                              size="large"
                              onSearch={onSearch} />
                      {/* Start Date search */}
                      <DatePicker className="search-filter__date"
                                  defaultValue={dayjs('2025-12-10', dateFormat)}
                                  minDate={dayjs('2023-01-01', dateFormat)}
                                  maxDate={dayjs('2025-06-30', dateFormat)} />
                      {/* End Date search */}
                      <DatePicker className="search-filter__date"
                                  defaultValue={dayjs('2025-12-10', dateFormat)}
                                  minDate={dayjs('2023-01-01', dateFormat)}
                                  maxDate={dayjs('2025-06-30', dateFormat)} />
                    </div>
                  {/* Search filter switch */}
                  <Switch  className="switch" onChange={onSwitchChange} />
                </div>
                
                {/* Table */}
                <Table<DataType> 
                    columns={columns}
                    dataSource={tableRow}
                    // onChange={onTableChange}
                    // scroll={{ y: '60vh' }}
                    showSorterTooltip={{ target: 'sorter-icon' }} /> 
              </Content>
            </Layout>
          </div>

          {/* Footer */}
          <Footer className="footer">
            <FloatButton onClick={() => console.log('onClick')} />
          </Footer>
        </Layout>
  )
}

export default App
