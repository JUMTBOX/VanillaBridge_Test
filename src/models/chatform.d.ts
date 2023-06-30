interface Message {
    mtype: string;
    content: string | any;
}
export interface ChatForm {
    id?: number;
    user_id: number;
    user_name: string;
    photo_url: string;
    created_at: Date;
    msg: Message;
}
export {};
