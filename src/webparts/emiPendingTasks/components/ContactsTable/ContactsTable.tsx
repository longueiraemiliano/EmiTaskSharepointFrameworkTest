import * as React from 'react';
import PropTypes from 'prop-types';
import { Panel, Grid, Row, Col, Table, Tabs, Tab} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn}  from 'react-bootstrap-table';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { IContactResult } from '../../utils/IContactResult';
import { IEmiPendingTasksWebPartProps } from '../../IEmiPendingTasksWebPartProps';
import  listActions from '../../flux/actions/listActions';
import listStore from '../../flux/stores/listStore';

export interface IContactsTable {    
	loaded?: Boolean;	
    contacts?: IContactResult[]
}

export interface IContactsTableProps {
	context: IWebPartContext;	
}

export interface ContactsTableProps {
    tasks: IContactResult[]
}

export default class ContactsTable extends React.Component<IContactsTableProps, IContactsTable> {
    constructor(props: IContactsTableProps) {        
		super(props);	 
        this.state = {            
            loaded: false,
            contacts: []
        };        

        this._onChange = this._onChange.bind(this);
	};

    public componentDidMount(): void {
		// Get the new results        
        this._getContacts();
	}

    private _onChange() {        
        this.setState({
            loaded: true,
            contacts: listStore.getContactsResults()
        })
    }

    private _getContacts() {
        listStore.addChangeListener(this._onChange);
        listActions.getContacts(this.props.context, 'Contacts');
    }

    public render(): JSX.Element {           
        if(this.state.contacts.length) {
            return (
                <Panel>
                    <BootstrapTable data={ this.state.contacts } striped hover condensed>
                        <TableHeaderColumn dataField='ID' isKey>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='FirstName'>Nombre</TableHeaderColumn>
                        <TableHeaderColumn dataField='LastName'>Apellido</TableHeaderColumn>
                        <TableHeaderColumn dataField='Phone'>Phone</TableHeaderColumn>
                        <TableHeaderColumn dataField='Email'>Email</TableHeaderColumn>
                    </BootstrapTable>
                </Panel>);
        }        
        else{
            return (
                <div>Cargando contactos..</div>
            );
        }
    }
}