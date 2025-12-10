import { Table, FloatButton, Switch, Input, Flex, Layout, DatePicker } from 'antd';
import type { TableColumnsType, TableProps, GetProps  } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './App.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

//and design 관련
const { Search } = Input;
const { Header, Footer, Content } = Layout;
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

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];

function App() {
  const[showSearch, setShowSearch] = useState(false); 
  const tableRow = useSelector((state) => { return state.tableRow})
  

  const onSwitchChange = () => {
    setShowSearch(!showSearch);
  };

  const onTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  return (
      <Flex gap="middle" wrap>
        <Layout className="layout-main-style">
        <Header className="layout-header-style">
          <Switch defaultChecked onChange={onSwitchChange} />
          {showSearch ? 
            <div style={{display: 'flex', justifyContent: 'center'}}>
              {/* Req ID Search */}
              <Search className="search-style"
                      placeholder="Req ID"
                      allowClear
                      enterButton="Search"
                      size="large"
                      onSearch={onSearch} />
              {/* Status Search */}
              <Search className="search-style"
                      placeholder="Status"
                      allowClear
                      enterButton="Search"
                      size="large"
                      onSearch={onSearch} />
              {/* File Name Search */}
              <Search className="search-style"
                      placeholder="File Name"
                      allowClear
                      enterButton="Search"
                      size="large"
                      onSearch={onSearch} />
              {/* Start Date Search */}
              <DatePicker className="search-style"
                          defaultValue={dayjs('2025-12-10', dateFormat)}
                          minDate={dayjs('2023-01-01', dateFormat)}
                          maxDate={dayjs('2025-06-30', dateFormat)} />
              {/* End Date Search */}
              <DatePicker className="search-style"
                          defaultValue={dayjs('2025-12-10', dateFormat)}
                          minDate={dayjs('2023-01-01', dateFormat)}
                          maxDate={dayjs('2025-06-30', dateFormat)} />
            </div>
          : null}
        </Header>
        <Content className="layout-content-style">
          <Table<DataType> 
                columns={columns}
                dataSource={tableRow}
                // onChange={onTableChange}
                scroll={{ y: '75vh', x: '100%' }}
                showSorterTooltip={{ target: 'sorter-icon' }} /> 
        </Content>
        <Footer className="layout-footer-style">
          <FloatButton onClick={() => console.log('onClick')} />
        </Footer>
        </Layout>
      </Flex>
  )
}

export default App
