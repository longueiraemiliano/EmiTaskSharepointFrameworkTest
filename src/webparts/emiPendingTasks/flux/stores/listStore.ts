import appDispatcher from '../dispatcher/appDispatcher';
import listActionIDs from '../actions/listActionIDs';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
// import { ISearchResults, ICells, ICellValue } from '../../utils/ISearchResults';
import { ITaskResults, ITaskResult } from '../../utils/ITaskResult';

import { EventEmitter } from 'fbemitter';

import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

const CHANGE_EVENT: string = 'change';

export class ListStoreStatic extends EventEmitter {
	private _results: any[] = [];
	private _url: string;
	private _response: any;

	/**
	 * @param {function} callback
	 */
	public addChangeListener(callback): void {
        // this.on(CHANGE_EVENT, callback);
		this.addListener(CHANGE_EVENT, callback);
    }

	/**
	 * @param {function} callback
	 */
    public removeChangeListener(callback): void {
        // this.removeListener(CHANGE_EVENT, callback);
		this.removeCurrentListener();
    }

    public emitChange(): void {
        this.emit(CHANGE_EVENT);
    }		

	public getSearchResults(): ITaskResult[] {
		return this._results;
	}

	/**
	 * @param {IWebPartContext} context
	 * @param {string} url
	 */
	// public GetSearchData (context: IWebPartContext, url: string): Promise<ISearchResults> {
	// 	return context.spHttpClient.get(url, SPHttpClient.configurations.v1).then((res: Response) => {
	// 		return res.json();
	// 	});
	// }

	public GetListTasks(context: IWebPartContext, url: string): Promise<ITaskResults> {
		return context.spHttpClient.get(context.pageContext.web.absoluteUrl + url, SPHttpClient.configurations.v1)
		.then((response: SPHttpClientResponse) => {
			return response.json();
		});
	}

    public GetUserTasks(context: IWebPartContext, url: string) {
        
    }

	/**
	 * @param {string} value
	 */
	public isEmptyString (value: string): boolean {
		return value === null || typeof value === "undefined" || !value.length;
	}

	/**
	 * @param {any} value
	 */
	public isNull (value: any): boolean {
		return value === null || typeof value === "undefined";
	}

	public setLoggingInfo(url: string, response: any) {
		this._url = url;
		this._response = response;
	}

	public getLoggingInfo(): any {
		return {
			URL: this._url,
			Response: this._response
		};
	}

	public setTasksResults(crntResults: ITaskResult[], context: IWebPartContext): void {
		if (crntResults.length > 0) {			
			const temp: any[] = [];
			crntResults.forEach((result) => {				
				let displayName = '';
				result.AssignedTo.forEach((user) => {
					displayName += user.FirstName + " " + user.LastName + "; ";
				});
				
				displayName = displayName.substr(0, displayName.lastIndexOf(";"));
				result.AssignedUsersDisplay = displayName;
				temp.push(result);
			});
			this._results = temp;
		} else {
			this._results = [];
		}
	}
}

const listStore: ListStoreStatic = new ListStoreStatic();

appDispatcher.register((action) => {
	switch (action.actionType) {
		case listActionIDs.TASKS_GET:			
			let resultsRetrieved = false;
			// if (res !== null) {				
			// }

			// Reset the store its search result set on error
			// if (!resultsRetrieved) {
			// 	searchStore.setSearchResults([], null);
			// }
			let url = "/_api/web/lists/GetByTitle('" + action.listName + "')/items/?$select=ID,Title,Body,DueDate,StartDate,Priority,Status,AssignedTo/FirstName,AssignedTo/LastName,AssignedTo/Name,AssignedTo/Id&$expand=AssignedTo/Id";
			listStore.GetListTasks(action.context, url).then((res: ITaskResults) => {
				resultsRetrieved = true;
				listStore.setTasksResults(res.value, action.context);
				listStore.emitChange();					
			});							
		break;
	}
});

export default listStore;