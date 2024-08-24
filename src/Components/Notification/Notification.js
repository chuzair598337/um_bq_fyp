// Notification.js
import { NotificationManager } from 'react-notifications';

export const createNotification = (type, title, content) => {
    switch (type) {
        case 'info':
            NotificationManager.info(content, title,3000);
            break;
        case 'success':
            NotificationManager.success(content, title,3000);
            break;
        case 'warning':
            NotificationManager.warning(content, title, 3000);
            break;
        case 'error':
            NotificationManager.error(content, title, 3000)
            // NotificationManager.error(content, title, 5000, () => {
            //     alert('Callback triggered');
            // });
            break;
        default:
            break;
    }
};
