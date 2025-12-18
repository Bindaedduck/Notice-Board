import dayjs from 'dayjs';

const tableColumns = () => [
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
        
]

export default tableColumns;