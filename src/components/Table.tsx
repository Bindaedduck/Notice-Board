import { Table as AntdTable, Popconfirm, Button, Space, Checkbox, Form, Input, InputNumber  } from 'antd';
import type { TableProps } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { type NoticeBoard, chaneTableRow } from '.././features/noticeBoard/noticeBoardSlice.tsx';
import { type RootState } from '../store.tsx';

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
    const tableRow = useSelector((state: RootState) => { return state.noticeBoard});
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const isEditing = (record: NoticeBoard) => record.reqId == editingReqId;

    const cancel = () => { setEditingReqId(''); };

    const rowDelete = (reqId: string) => {
        const newtableRow = tableRow.filter((item: any) => item.reqId !== reqId);
        
        dispatch(chaneTableRow(newtableRow));
        setShowOperation(!showOperation);
        setSelectedRowsKey([]);
    };

    const edit = (record: Partial<NoticeBoard> & { reqId: string}, option: string) => {
        if(option === 'update'){
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
        else if(option === 'add')
         return;
        
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
                dispatch(chaneTableRow(newtableRow));
                setEditingReqId('');
            } else {
                newtableRow.push(row);
                dispatch(chaneTableRow(newtableRow));
                setEditingReqId('');
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
                            <Button color="primary" onClick={() => cancel()}>Cancel</Button> 
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
            const uniformKeys = SelectedRowKeys.map(key => String(key)); 
            const uniformReqId = selection.map(item => item.reqId); 

            setSelectedRowsKey(uniformKeys);
            setSelectedReqId(uniformReqId); 

            if(SelectedRowKeys.length === 0 || !showOperation)
                setShowOperation(!showOperation);
        },
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
        <Form form={form} component={false}>
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
        </Form>
    );
}

export default Table;