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
    const[showOperation, setShowOperation] = useState(false);
    const[editingKey, setEditingKey] = useState<React.Key>('');
    const tableRow = useSelector((state: RootState) => { return state.noticeBoard});
    const dispatch = useDispatch();
    
    const [form] = Form.useForm();
    const isEditing = (record: NoticeBoard) => record.key == editingKey;

    const cancel = () => { setEditingKey(''); };

    const rowDelete = (key: React.Key) => {
        const newtableRow = tableRow.filter((item: any) => item.key !== key);
        
        dispatch(chaneTableRow(newtableRow));
        setShowOperation(!showOperation);
        setSelectedRowsKey([]);
    };

    const edit = (record: Partial<NoticeBoard> & { key: React.Key}) => {
        form.setFieldsValue({ bizCLS: '', idpType: '', status: '',...record});
        setEditingKey(record.key);
    }

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as NoticeBoard;

            const newtableRow = [...tableRow];
            const index = newtableRow.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newtableRow[index];
                newtableRow.splice(index, 1, {
                ...item,
                ...row,
                });
                dispatch(chaneTableRow(newtableRow));
                setEditingKey('');
            } else {
                newtableRow.push(row);
                dispatch(chaneTableRow(newtableRow));
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const columns = [
        {
            title: 'Req Id',
            dataIndex: 'reqId',
            editable: false,
        },
        {
            title: 'Biz CLS',
            dataIndex: 'bizCLS',
            sorter: (a: any, b: any) => a.bizCLS.localeCompare(b.bizCLS),
            editable: true,
        },
        {
            title: 'Idp Type',
            dataIndex: 'idpType',
            sorter: (a: any, b: any) => a.idpType.localeCompare(b.idpType),
            editable: true,
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
            editable: true,
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

    const extraColumn = {
        title: 'Operation',
        dataIndex: 'operation',
        editable: false,
        render: (_: any, record: NoticeBoard) => {
            const eidtable = isEditing(record);
            return (selectedRowsKey.includes(record.key) ? 
                    (eidtable ? (
                        <Space size="small">
                            <Popconfirm title="수정하시겠습니까?" onConfirm={() => save(record.key)}>
                                <Button color="primary" variant="outlined">Save</Button>
                            </Popconfirm>
                            <Button color="primary" onClick={() => cancel()}>Cancel</Button> 
                        </Space>
                    ) : (
                        <Space size="middle">
                        <Button color="primary" variant="outlined" disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</Button>
                        <Popconfirm title="정말 삭제하시겠습니까?" onConfirm={() => rowDelete(record.key)}>
                            <Button danger disabled={editingKey !== ''}>Delete</Button>
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

        onChange: (SelectedRowKeys: React.Key[]) => {
            const uniformKeys = SelectedRowKeys.map(key => String(key)); 
            
            setSelectedRowsKey(uniformKeys);

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