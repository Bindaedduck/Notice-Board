import React, { useState } from 'react';
import { type NoticeBoard, changeTableRow } from '.././features/noticeBoard/noticeBoardSlice.tsx';

const useNoticeBoardLogic = (
    tableRow: any, 
    dispatch: any, 
    form: any, 
    columns: any, 
    setColumns: any,
    openSuccessNotification: (msg: string) => void,
    openMessage: (msg: string) => void
) => {
    const[showOperation, setShowOperation] = useState(false);
    const[isAdd, setIsAdd] = useState(true);
    const[editingReqId, setEditingReqId] = useState('');
    const[selectedReqId, setSelectedReqId] = useState<string[]>([]);
    const[selectedRowsKey, setSelectedRowsKey] = useState<React.Key[]>([]);

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
        }else if(action === 'add'){
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
        }catch(errInfo){
            console.log('Validate Failed:', errInfo);
        }
    };

    return {
        states: { showOperation, isAdd, editingReqId, selectedReqId, selectedRowsKey },
        actions: { setShowOperation, setIsAdd, setEditingReqId, setSelectedReqId, setSelectedRowsKey },
        handlers: { cancel, rowDelete, rowAdd, edit, save }
    };
}

export default useNoticeBoardLogic;