import {IWebPartContext} from '@microsoft/sp-webpart-base';
export interface IListAction {
    actionType: Number;
    context?: IWebPartContext;
    userLoginName?: string;
    listName: string;
    maxResults?: number;
    sorting?: string;
    fields?: string;
}