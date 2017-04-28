import appDispatcher from '../dispatcher/appDispatcher';
import listActionIDs from './listActionIDs';
import {IWebPartContext} from '@microsoft/sp-webpart-base';

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
}

const listActions: ListActionsStatic = new ListActionsStatic();
export default listActions;