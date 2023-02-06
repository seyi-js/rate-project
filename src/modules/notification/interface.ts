

export type EmailNotificationTypes = 'VERIFY_EMAIL' | 'FORGOT_PASSWORD';


export type IEmailNotification = {
    type: EmailNotificationTypes;
    to:string;
}