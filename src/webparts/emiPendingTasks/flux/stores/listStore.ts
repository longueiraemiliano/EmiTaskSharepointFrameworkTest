import appDispatcher from '../dispatcher/appDispatcher';
import listActionIDs from '../actions/listActionIDs';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ITaskResults, ITaskResult } from '../../utils/ITaskResult';
import { IContactResults, IContactResult } from '../../utils/IContactResult';
import { EventEmitter } from 'fbemitter';
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions   
} from '@microsoft/sp-http';

const CHANGE_EVENT: string = 'change';

export class ListStoreStatic extends EventEmitter {
	private _results: any[] = [];
	private _contacts: IContactResult[] = [];
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

	public getContactsResults(): IContactResult[] {
		return this._contacts;
	}

	public GetListTasks(context: IWebPartContext, url: string): Promise<ITaskResults> {
		return context.spHttpClient.get(context.pageContext.web.absoluteUrl + url, SPHttpClient.configurations.v1)
		.then((response: SPHttpClientResponse) => {
			return response.json();
		});
	}

	public GetContacts(context: IWebPartContext, url: string): Promise<IContactResults> {
		return context.spHttpClient.get(context.pageContext.web.absoluteUrl + url, SPHttpClient.configurations.v1)
		.then((response: SPHttpClientResponse) => {
			return response.json();
		});
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

	public addContact(context: IWebPartContext, httpClientOptions: ISPHttpClientOptions, url: string): Promise<IContactResult> {                
        return context.spHttpClient.post(context.pageContext.web.absoluteUrl + url, SPHttpClient.configurations.v1, httpClientOptions).then((response: SPHttpClientResponse) => {
			return response.json();
		});
    }

	public addContactToList(contact: IContactResult){
		this._contacts.push(contact);
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

	public setContactResults(result: IContactResult[]){
		this._contacts = result;
	}
}

const listStore: ListStoreStatic = new ListStoreStatic();

appDispatcher.register((action) => {
	switch (action.actionType) {
		case listActionIDs.TASKS_GET:			
			var resultsRetrieved = false;						
			var url = "/_api/web/lists/GetByTitle('" + action.listName + "')/items/?$select=ID,Title,Body,DueDate,StartDate,Priority,Status,AssignedTo/FirstName,AssignedTo/LastName,AssignedTo/Name,AssignedTo/Id&$expand=AssignedTo/Id";
			listStore.GetListTasks(action.context, url).then((res: ITaskResults) => {
				resultsRetrieved = true;
				listStore.setTasksResults(res.value, action.context);
				listStore.emitChange();					
			});							
		break;
		case listActionIDs.CONTACTS_GET:			
			var resultsRetrieved = false;			
			var url = "/_api/web/lists/GetByTitle('" + action.listName + "')/items/?$select=ID,Title,Email,FirstName,LastName,Phone";
			listStore.GetContacts(action.context, url).then((res: IContactResults) => {				
				listStore.setContactResults(res.value);
				listStore.emitChange();					
			});							
		break;
		case listActionIDs.ADD_CONTACT:			
			var url = "/_api/Lists/getByTitle('" + action.listName + "')/items";
        
			const httpClientOptions: ISPHttpClientOptions = {
				body:JSON.stringify({
					Title: action.contact.apellido,
					FirstName: action.contact.nombre,
					LastName: action.contact.apellido,
					Phone: action.contact.phone,
					Email: action.contact.email
				})
			};
			
			listStore.addContact(action.context, httpClientOptions, url).then((res: IContactResult) => {
				
				// var url = "/_api/web/lists/GetByTitle('" + action.listName + "')/items/?$select=ID,Title,Email,FirstName,LastName,Phone";
				// listStore.GetContacts(action.context, url).then((res: IContactResults) => {				
				// 	listStore.setContactResults(res.value);
					listStore.addContactToList(res);
					listStore.emitChange();					
				// });
			});
		break;
	}
});

export default listStore;