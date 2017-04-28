import * as React from 'react';
import { Panel, Grid, Row, Col, Table, Tabs, Tab} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn}  from 'react-bootstrap-table';
import styles from './EmiPendingTasks.module.scss';
import { IEmiPendingTasksWebPartProps } from '../IEmiPendingTasksWebPartProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import  listActions from '../flux/actions/listActions';
import listStore from '../flux/stores/listStore';
import { ITaskResult } from '../utils/ITaskResult';

export interface ITasksSpfxProps extends IEmiPendingTasksWebPartProps {
	context: IWebPartContext;
	firstRender: Boolean;
  allTasks: Boolean; 	
}

export interface ITasksState {
  results?: ITaskResult[];
	loaded?: Boolean;	
}

export default class EmiPendingTasks extends React.Component<ITasksSpfxProps, ITasksState> {  

  constructor(props: ITasksSpfxProps, context: IWebPartContext) {
		super(props, context);
		this.state = {
			results: [],
			loaded: false
		};
    
		this._onChange = this._onChange.bind(this);
	};

  private _onChange(): void {		
    this.setState({
      results: listStore.getSearchResults(),
      loaded: true
    });
  }

  public componentDidMount(nextProps: ITasksSpfxProps): void {
		// Get the new results
    listStore.addChangeListener(this._onChange);
		this._getResults(this.props);
	}

	private _getResults(crntProps: ITasksSpfxProps): void {		
			listActions.get(crntProps.context, crntProps.context.pageContext.user.loginName, crntProps.title, 10, "Descending", "ID");
	}

  public render(): JSX.Element {
    let taskTable = (
      <Panel>
        <BootstrapTable data={ this.state.results } striped hover condensed>
          <TableHeaderColumn dataField='ID' isKey>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='AssignedUsersDisplay'>Asignado</TableHeaderColumn>
          <TableHeaderColumn dataField='Title'>Título</TableHeaderColumn>
          <TableHeaderColumn dataField='Status'>Status</TableHeaderColumn>
          <TableHeaderColumn dataField='Priority'>Prioridad</TableHeaderColumn>
          <TableHeaderColumn dataField='StartDate'>Fecha de Inicio</TableHeaderColumn>
          <TableHeaderColumn dataField='DueDate'>Fecha de Vencimiento</TableHeaderColumn>
        </BootstrapTable>
        </Panel>);

    let tabsInstance = (
      <Tabs defaultActiveKey={2}  id="uncontrolled-tab-example">
        <Tab eventKey={1}  title="Tab 1">{taskTable}</Tab>
        <Tab eventKey={2}  title="Tab 2">Tab 2 content</Tab>
        <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
      </Tabs>
    );

    return (            
      <div>
        {tabsInstance}        
      </div>
    );    
  }
}
