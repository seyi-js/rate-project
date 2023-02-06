export enum EventEnum {
    EMAIL_NOTIFICATION = 'EMAIL_NOTIFICATION',
    SMS_NOTIFICATION = 'SMS_NOTIFICATION',
    PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
}

export type IEvent = keyof typeof EventEnum;