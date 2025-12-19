import { Table as AntdTable, Popconfirm, Button, Space, Checkbox, Form, Input, FloatButton, Switch, DatePicker, Spin } from 'antd';
import type { TableProps, GetProps  } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { type NoticeBoard, initialTableRow, filterTableRow } from '.././features/noticeBoard/noticeBoardSlice.tsx';
import { type RootState } from '../store.tsx';
import '../App.css';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useNotification from '../hooks/useNotification.ts';
import useMessage from '../hooks/useMessage.ts';
import tableColumns from '../constants/tableColumns.ts';
import EditableCell from './EdittableCell.tsx';
import useNoticeBoardLogic from '../hooks/useNoticeBoardLogic.ts';

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

const dateFormat = 'YYYY-MM-DD';
dayjs.extend(customParseFormat);

function Table() { 
    const[showSearchFilter, setShowSearchFilter] = useState(false)
    const tableRow = useSelector((state: RootState) => { return state.noticeBoard});
    const dispatch = useDispatch();
    const[loading, setLoading] = useState(false); //로딩표시

    const[form] = Form.useForm();

    const { contextHolder: notificationContext, openSuccessNotification } = useNotification();
    const { contextHolder: messageContext, openMessage } = useMessage();
    
    const[columns, setColumns] = useState(tableColumns);
    const { states, actions, handlers } = useNoticeBoardLogic(
        tableRow, 
        dispatch, 
        form, 
        columns, 
        setColumns, 
        openSuccessNotification, 
        openMessage
    );

    const onSwitchChange = () => {
        setShowSearchFilter(!showSearchFilter);
    }

    const onSearch: SearchProps['onSearch'] = (column: string, value: string) => {   
        

        if(value){
            // let newtableRow: NoticeBoard[] = [];

            // if(column === 'reqId')
            //      newtableRow = tableRow.filter((item: any) => (item.reqId).includes(value));   
            // else if(column === 'status')
            //      newtableRow = tableRow.filter((item: any) => item.status === value);

            // dispatch(changeTableRow(newtableRow));
            
            const actionPayload = {id: column, keyword: value};
            dispatch(filterTableRow(actionPayload));
            
        }else{
            dispatch(initialTableRow());
        }
    }

    const searchIsVisible = `search--IsVisible ${ showSearchFilter? 'visible' : 'hidden'}`

    const isEditing = (record: NoticeBoard) => record.reqId == states.editingReqId;

    const extraColumn = {
        title: 'Operation',
        dataIndex: 'operation',
        editable: false,
        render: (_: any, record: NoticeBoard) => {
            const eidtable = isEditing(record);
            return (states.selectedReqId.includes(record.reqId) ? 
                    (eidtable ? (
                        <Space size="small">
                            <Popconfirm title="수정하시겠습니까?" onConfirm={() => handlers.save(record.reqId)}>
                                <Button color="primary" variant="outlined">Save</Button>
                            </Popconfirm>
                            <Button color="primary" onClick={() => handlers.cancel(states.isAdd)}>Cancel</Button> 
                        </Space>
                    ) : (
                        <Space size="middle">
                        <Button color="primary" variant="outlined" disabled={states.editingReqId !== ''} onClick={() => handlers.edit(record,'update')}>Edit</Button>
                        <Popconfirm title="정말 삭제하시겠습니까?" onConfirm={() => handlers.rowDelete(record.reqId)}>
                            <Button danger disabled={states.editingReqId !== ''}>Delete</Button>
                        </Popconfirm>
                        </Space>
                    )):<div></div>)
        }
    };

    const finalColumns = states.showOperation ? [...columns, extraColumn] : columns

    const rowSelection: TableProps<NoticeBoard>['rowSelection'] = {
        selectedRowKeys: states.selectedRowsKey,

        onChange: (SelectedRowKeys: React.Key[], selection) => {
            if(!states.isAdd){
                openMessage('이미 추가중인 작업이 있습니다.');
                return;
        }

            const uniformKeys = SelectedRowKeys.map(key => String(key)); 
            const uniformReqId = selection.map(item => item.reqId); 

            actions.setSelectedRowsKey(uniformKeys);
            actions.setSelectedReqId(uniformReqId); 

            if(SelectedRowKeys.length === 0 || !states.showOperation){
                actions.setShowOperation(!states.showOperation);
                //setIsAdd(false)
            }
        }
    };

    const mergedColumns: TableProps<NoticeBoard>['columns'] = finalColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: NoticeBoard) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Space orientation="vertical" size="large">
            <div style={{display: 'flex'}}>
                {/* Search */}
                <div className={searchIsVisible}>
                    {/* Req ID search */}
                    <Search className="search"
                            placeholder="Req ID"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={(value) => onSearch("reqId",value)} />
                    {/* Status search */}
                    <Search className="search"
                            placeholder="Status"
                            allowClear
                            enterButton="search"
                            size="large"
                            onSearch={(value) => onSearch("status",value)} />
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
                <Switch className="switch" onChange={onSwitchChange} />
            </div>
            <Form form={form} component={false}>
                <Spin spinning = {loading}>
                <AntdTable<NoticeBoard>
                    rowKey="reqId"
                    components={{
                        body: { cell: EditableCell },
                    }}
                    rowSelection={{ type: Checkbox, ...rowSelection }}
                    columns={mergedColumns}
                    dataSource={tableRow}
                    scroll={{ y: '60vh' }}
                    showSorterTooltip={{ target: 'sorter-icon' }} /> 
                </Spin>
            </Form>
            {messageContext}
            {notificationContext}
            <FloatButton onClick={handlers.rowAdd}  />
        </Space>
    );
}

export default Table;