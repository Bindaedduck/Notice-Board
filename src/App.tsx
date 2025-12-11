import { Table, FloatButton, Switch, Input, Flex, Layout, DatePicker, Breadcrumb, Menu, theme, Checkbox, Popconfirm, Button } from 'antd';
import type { TableColumnsType, TableProps, GetProps, MenuProps  } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './App.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chaneTableRow } from "./store/tableStore.tsx"

//and design 관련
const { Search } = Input;
const { Header, Footer, Content, Sider } = Layout;
type SearchProps = GetProps<typeof Input.Search>;

const dateFormat = 'YYYY-MM-DD';
dayjs.extend(customParseFormat);

interface DataType {
  key: React.Key;
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

function App() {
  const[showSearchFilter, setShowSearchFilter] = useState(false); 
  const[showOperation, setShowOperation] = useState(false);
  const dispatch = useDispatch();
  const searchIsVisible = `search__IsVisible ${ showSearchFilter? 'visible' : 'hidden'}`;
  const tableRow = useSelector((state) => { return state.tableRow})
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onSwitchChange = () => {
    setShowSearchFilter(!showSearchFilter);
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const handleDelete = (key: React.Key) => {
    const newData = tableRow.filter((item) => item.key !== key);
    dispatch(chaneTableRow(newData));
  };

  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setShowOperation(!showOperation);
    },
    // getCheckboxProps: (record: DataType) => ({
    //   disabled: record.reqId === 'Disabled User', // Column configuration not to be checked
    //   name: record.reqId,
    // }),
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Req Id',
      dataIndex: 'reqId',
      showSorterTooltip: { target: 'full-header' },
    },
    {
      title: 'Biz CLS',
      dataIndex: 'bizCLS',
      sorter: (a, b) => a.bizCLS.localeCompare(b.bizCLS),
    },
    {
      title: 'Idp Type',
      dataIndex: 'idpType',
      sorter: (a, b) => a.idpType.localeCompare(b.idpType),
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
      sorter: (a, b) => a.page - b.page,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Start Date Time',
      dataIndex: 'startDateTime',
      sorter: (a, b) => dayjs(a.startDateTime).valueOf() - dayjs(b.startDateTime).valueOf(),
    },
    {
      title: 'End Date Time',
      dataIndex: 'endDateTime',
      sorter: (a, b) => dayjs(a.endDateTime).valueOf() - dayjs(b.endDateTime).valueOf(),
    }
  ];

  const extraColumn = {
    className: showOperation ? "column-operation__visible" : "column-operation__hidden",
    title: 'Operation',
    dataIndex: 'operation',
    render: (_, record) =>
      tableRow.length >= 1 ? (
        <div style={{ display:"flex", gap:"5px" }}>
          <Button color="primary" variant="outlined" onClick={() => handleDelete(record.key)}>Edit</Button>


          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ) : null,
  }

  //체크버튼을 누른 상태면 Operation컬럼 보여주기
  const finalColumns = showOperation ? [...columns, extraColumn] : columns;

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
                      <DatePicker className="search--date"
                                  minDate={dayjs('2023-01-01', dateFormat)}
                                  maxDate={dayjs('2025-06-30', dateFormat)} />
                      {/* End Date search */}
                      <DatePicker className="search--date"
                                  minDate={dayjs('2023-01-01', dateFormat)}
                                  maxDate={dayjs('2025-06-30', dateFormat)} />
                    </div>
                  {/* Search filter switch */}
                  <Switch  className="switch" onChange={onSwitchChange} />
                </div>
                
                {/* Table */}
                <Table<DataType> 
                    rowSelection={{ type: Checkbox, ...rowSelection }}
                    columns={finalColumns}
                    dataSource={tableRow}
                    scroll={{ y: '60vh' }}
                    showSorterTooltip={{ target: 'sorter-icon' }} /> 
              </Content>
            </Layout>
          </div>

          {/* Footer */}
          <Footer style = {{background: borderRadiusLG, textAlign: "center"}}>
            <FloatButton onClick={() => console.log('onClick')} />
          </Footer>
        </Layout>
  )
}

export default App

