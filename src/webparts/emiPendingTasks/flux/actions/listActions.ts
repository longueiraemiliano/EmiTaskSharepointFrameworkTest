import appDispatcher from '../dispatcher/appDispatcher';
import listActionIDs from './listActionIDs';
import {IWebPartContext} from '@microsoft/sp-webpart-base';
import { IContactForm } from '../../components/ContactForm/ContactForm';

export class ListActionsStatic {
	/**
	 * @param  {string} userLoginName
	 * @param  {string} fields
	 */
	public get(context: IWebPartContext, userLoginName: string, listName: string, maxResults: number, sorting: string, fields?: string): void {
		appDispatcher.dispatch({
			actionType: listActionIDs.TASKS_GET,
			context: context,
			userLoginName: userLoginName,
            listName: listName,
			maxResults: maxResults,
			sorting: sorting,
			fields: fields
		});
	}

	public getContacts(context: IWebPartContext, listName: string) {
		appDispatcher.dispatch({
			actionType: listActionIDs.CONTACTS_GET,
			context: context,			
            listName: listName,			
		});
	}

	public addContact(context: IWebPartContext, listName: string, contact: IContactForm) {
		appDispatcher.dispatch({
			actionType: listActionIDs.ADD_CONTACT,
			context: context,			
            listName: listName,			
			contact: contact
		});
	}
}

const listActions: ListActionsStatic = new ListActionsStatic();
export default listActions;