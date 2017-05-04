import {IWebPartContext} from '@microsoft/sp-webpart-base';
import {IContactForm} from '../../components/ContactForm/ContactForm';
export interface IListAction {
    actionType: Number;
    context?: IWebPartContext;
    userLoginName?: string;
    listName: string;
    maxResults?: number;
    sorting?: string;
    fields?: string;
    contact?: IContactForm; 
}