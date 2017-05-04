import * as React from 'react';
import PropTypes from 'prop-types';
import { Panel, Grid, Row, Col, Table, Tabs, Tab} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn}  from 'react-bootstrap-table';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITaskResult } from '../../utils/ITaskResult';

export interface ITasksTable {    
	loaded?: Boolean;	
}

export interface PendingTaskTableProps {
    tasks: ITaskResult[]
}

export default class PendingTasksTable extends React.Component<PendingTaskTableProps, ITasksTable> {
    constructor(props: ITaskResult[]) {
		super(props);	 
        this.state = {            
            loaded: false
        };        
	};

    public componentDidMount(nextProps: ITaskResult[]): void {
		// Get the new results        
        this.setState({loaded: true });        
	}

    public render(): JSX.Element {        
        let taskTable = (
            <Panel>
                <BootstrapTable data={ this.props.tasks } striped hover condensed>
                    <TableHeaderColumn dataField='ID' isKey>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='AssignedUsersDisplay'>Asignado</TableHeaderColumn>
                    <TableHeaderColumn dataField='Title'>Título</TableHeaderColumn>
                    <TableHeaderColumn dataField='Status'>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField='Priority'>Prioridad</TableHeaderColumn>
                    <TableHeaderColumn dataField='StartDate'>Fecha de Inicio</TableHeaderColumn>
                    <TableHeaderColumn dataField='DueDate'>Fecha de Vencimiento</TableHeaderColumn>
                </BootstrapTable>
            </Panel>);

        return (
            taskTable
        );
    }
}