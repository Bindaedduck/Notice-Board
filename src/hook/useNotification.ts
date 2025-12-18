import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

const useNotification = () => {
        const [api, contextHolder] = notification.useNotification();

        const openSuccessNotification = (description: string, placement: NotificationPlacement = 'bottomRight') => {
           api.success({
            title: `Notification`,
            description,
            placement,
            showProgress: true
           })
        };

        return {
                contextHolder,           
                openSuccessNotification 
        };
};

export default useNotification;