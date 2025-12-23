import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import { type NoticeBoard } from '.././features/noticeBoard/noticeBoardSlice.ts';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> { 
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: NoticeBoard;
    index: number;
}

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

export default EditableCell;