import { Table as AntdTable, Popconfirm, Button, Space, Checkbox, Form, Input, InputNumber, FloatButton, Switch, DatePicker, Spin } from 'antd';
import type { TableProps, GetProps  } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { type NoticeBoard, changeTableRow, initialTableRow, filterTableRow } from '.././features/noticeBoard/noticeBoardSlice.tsx';
import { type RootState } from '../store.tsx';
import '../App.css';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useNotification from '../hook/useNotification.ts';
import useMessage from '../hook/useMessage.ts';

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

const dateFormat = 'YYYY-MM-DD';
dayjs.extend(customParseFormat);

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> { 
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: NoticeBoard;
    index: number;
}

function Table() { 
    const[selectedRowsKey, setSelectedRowsKey] = useState<React.Key[]>([]);
    const[selectedReqId, setSelectedReqId] = useState<string[]>([]);
    const[showOperation, setShowOperation] = useState(false);
    const[editingReqId, setEditingReqId] = useState('');
    const[showSearchFilter, setShowSearchFilter] = useState(false)
    const[isAdd, setIsAdd] = useState(true);
    const tableRow = useSelector((state: RootState) => { return state.noticeBoard});
    const dispatch = useDispatch();
    const[loading, setLoading] = useState(false); //로딩표시

    const[form] = Form.useForm();

    const { contextHolder: notificationContext, openSuccessNotification } = useNotification();
    const { contextHolder: messageContext, openMessage } = useMessage();


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

    const isEditing = (record: NoticeBoard) => record.reqId == editingReqId;

    const cancel = (isAdd: boolean) => { 
        if(!isAdd){
            const newtableRow = tableRow.filter((item: any) => item.reqId !== selectedReqId[0]);
            dispatch(changeTableRow(newtableRow));
            setShowOperation(!showOperation);
            setSelectedRowsKey([]);
            setSelectedReqId([]);
            setIsAdd(true);
        }
        
        setEditingReqId('');
    };

    const rowDelete = (reqId: string) => {
        

        const newtableRow = tableRow.filter((item: any) => item.reqId !== reqId);
        
        dispatch(changeTableRow(newtableRow));
        setShowOperation(!showOperation);
        setSelectedRowsKey([]);
        setIsAdd(true);

        openSuccessNotification('삭제가 완료되었습니다.');

        
    };

    const rowAdd = () =>{
        if(selectedRowsKey.length > 0){
            openMessage('체크된 목록이 있어 추가작업이 불가능합니다.');
            return;
        }

        if(!isAdd){
            openMessage('이미 추가중인 작업이 있습니다.');
            return;
        }

        if(isAdd){
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const array = new Uint32Array(26);
            crypto.getRandomValues(array);
            const newReqId:string = Array.from(array, x => chars[x % chars.length]).join('');

            const newTableRow: NoticeBoard = {
                reqId:newReqId,
                bizCLS:"",
                idpType:"",
                fileName:"",
                filePath:"",
                page:0,
                status:"",
                startDateTime:"",
                endDateTime:""
            }

            dispatch(changeTableRow([newTableRow,...tableRow]));
            edit(newTableRow, 'add');
            setShowOperation(!showOperation);
            setSelectedReqId([newReqId]);
            setIsAdd(false);
        }
    };

    const edit = (record: Partial<NoticeBoard> & { reqId: string}, action: string) => {
        if(action === 'update'){
           const editColumns = columns.map(item => {
                let editable = false;

                if (item.title === 'Biz CLS' || item.title === 'Idp Type' || item.title === 'Status') 
                    editable = true;
                else
                    editable = false; 
                
                return{
                    ...item,
                    editable: editable,
                }
            })
           setColumns(editColumns);
           form.setFieldsValue({ bizCLS: '', idpType: '', status: '',...record});
        }    
        else if(action === 'add'){
            const editColumns = columns.map(item => {
                let editable = false;

                if (item.title === 'Req Id' ) 
                    editable = false;
                else
                    editable = true; 
                
                return{
                    ...item,
                    editable: editable,
                }
            })
           setColumns(editColumns);
           form.setFieldsValue({...record});
        }
        
        setEditingReqId(record.reqId);
    };

    const save = async (reqId: string) => {
        try {
            const row = (await form.validateFields()) as NoticeBoard;

            const newtableRow = [...tableRow];
            const index = newtableRow.findIndex((item) => item.reqId === reqId);
            if (index > -1) {
                const item = newtableRow[index];
                newtableRow.splice(index, 1, {
                ...item,
                ...row,
                });
                dispatch(changeTableRow(newtableRow));
                setEditingReqId('');
                setShowOperation(!showOperation);
                setSelectedRowsKey([]);
                setIsAdd(true);
                if(isAdd)
                    openSuccessNotification('수정이 완료되었습니다.');
                else
                    openSuccessNotification('성공적으로 저장되었습니다.');
            } else {
                newtableRow.push(row);
                dispatch(changeTableRow(newtableRow));
                setEditingReqId('');
                setShowOperation(!showOperation);
                setSelectedRowsKey([]);
                setIsAdd(true);
            }

            
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const initialColumns = [
        {
            title: 'Req Id',
            dataIndex: 'reqId',
            editable: false,
        },
        {
            title: 'Biz CLS',
            dataIndex: 'bizCLS',
            sorter: (a: any, b: any) => a.bizCLS.localeCompare(b.bizCLS),
            editable: false,
        },
        {
            title: 'Idp Type',
            dataIndex: 'idpType',
            sorter: (a: any, b: any) => a.idpType.localeCompare(b.idpType),
            editable: false,
        },
        {
            title: 'File Name',
            dataIndex: 'fileName',
            editable: false,
        },
        {
            title: 'File Path',
            dataIndex: 'filePath',
            editable: false,
        },
        {
            title: 'Page',
            dataIndex: 'page',
            sorter: (a: any, b: any) => a.page - b.page,
            editable: false,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a :any, b :any) => a.status.localeCompare(b.status),
            editable: false,
        },
        {
            title: 'Start Date Time',
            dataIndex: 'startDateTime',
            sorter: (a :any, b :any) => dayjs(a.startDateTime).valueOf() - dayjs(b.startDateTime).valueOf(),
            editable: false,
        },
        {
            title: 'End Date Time',
            dataIndex: 'endDateTime',
            sorter: (a :any, b :any) => dayjs(a.endDateTime).valueOf() - dayjs(b.endDateTime).valueOf(),
            editable: false,
        }
    ];

    const[columns, setColumns] = useState(initialColumns);

    const extraColumn = {
        title: 'Operation',
        dataIndex: 'operation',
        editable: false,
        render: (_: any, record: NoticeBoard) => {
            const eidtable = isEditing(record);
            return (selectedReqId.includes(record.reqId) ? 
                    (eidtable ? (
                        <Space size="small">
                            <Popconfirm title="수정하시겠습니까?" onConfirm={() => save(record.reqId)}>
                                <Button color="primary" variant="outlined">Save</Button>
                            </Popconfirm>
                            <Button color="primary" onClick={() => cancel(isAdd)}>Cancel</Button> 
                        </Space>
                    ) : (
                        <Space size="middle">
                        <Button color="primary" variant="outlined" disabled={editingReqId !== ''} onClick={() => edit(record,'update')}>Edit</Button>
                        <Popconfirm title="정말 삭제하시겠습니까?" onConfirm={() => rowDelete(record.reqId)}>
                            <Button danger disabled={editingReqId !== ''}>Delete</Button>
                        </Popconfirm>
                        </Space>
                    )):<div></div>)
        }
    };

    const finalColumns = showOperation ? [...columns, extraColumn] : columns

    const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}>
                    {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const rowSelection: TableProps<NoticeBoard>['rowSelection'] = {
        selectedRowKeys: selectedRowsKey,

        onChange: (SelectedRowKeys: React.Key[], selection) => {
            if(!isAdd){
                openMessage('이미 추가중인 작업이 있습니다.');
                return;
        }

            const uniformKeys = SelectedRowKeys.map(key => String(key)); 
            const uniformReqId = selection.map(item => item.reqId); 

            setSelectedRowsKey(uniformKeys);
            setSelectedReqId(uniformReqId); 

            if(SelectedRowKeys.length === 0 || !showOperation){
                setShowOperation(!showOperation);
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
            <FloatButton onClick={rowAdd}  />
        </Space>
    );
}

export default Table;