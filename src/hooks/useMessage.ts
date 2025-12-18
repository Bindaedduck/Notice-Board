import { message } from 'antd';

const useMessage = () => {
    const[messageApi, contextHolder] = message.useMessage();

    const openMessage = (content: string) => {
       messageApi.open({
                type: 'warning',
                content,
       });
    };
    
    return {
        contextHolder,           
        openMessage 
    };

}

export default useMessage;