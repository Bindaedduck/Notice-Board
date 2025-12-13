import { Table as AntdTable, Popconfirm, Button, Space, Checkbox } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { type NoticeBoard, chaneTableRow } from '.././features/noticeBoard/noticeBoardSlice.tsx';
import { type RootState } from '../store.tsx';

function Table() {
    const[selectedRowsKey, setSelectedRowsKey] = useState<React.Key[]>([]);
    const[showOperation, setShowOperation] = useState(false);
    const tableRow = useSelector((state: RootState) => { return state.noticeBoard});
    const dispatch = useDispatch();

    const handleDelete = (key: React.Key) => {
        const newtableRow = tableRow.filter((item: any) => item.key !== key);
        
        dispatch(chaneTableRow(newtableRow));
        setShowOperation(!showOperation);
        setSelectedRowsKey([]);
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

    const columns: TableColumnsType<NoticeBoard> = [
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
        title: 'Operation',
        dataIndex: 'operation',
        render: (_: any, record: NoticeBoard) => {
            return (selectedRowsKey.includes(record.key) ? (
                <Space size="middle">
                <Button color="primary" variant="outlined" onClick={() => handleDelete(record.key)}>Edit</Button>


                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <Button danger>Delete</Button>
                </Popconfirm>
                </Space>
            ) : <div></div>)
        }
    }

    //체크버튼을 누른 상태면 Operation컬럼 보여주기
    const finalColumns = showOperation ? [...columns, extraColumn] : columns;

    return (
        <AntdTable<NoticeBoard> 
            rowSelection={{ type: Checkbox, ...rowSelection }}
            columns={finalColumns}
            dataSource={tableRow}
            scroll={{ y: '60vh' }}
            showSorterTooltip={{ target: 'sorter-icon' }} />
    )
}

export default Table;