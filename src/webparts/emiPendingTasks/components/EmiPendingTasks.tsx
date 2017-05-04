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
import PendingTasksTable from './PendingTasksTable/PendingTasksTable';
import ContactsTable from './ContactsTable/ContactsTable';

export interface ITasksSpfxProps extends IEmiPendingTasksWebPartProps {
	context: IWebPartContext;
	firstRender: Boolean;
  allTasks: Boolean; 	
}

export interface IContainerState {
  tasks?: ITaskResult[];
	loaded?: Boolean;	
}

export default class EmiPendingTasks extends React.Component<ITasksSpfxProps, IContainerState> {  

  constructor(props: ITasksSpfxProps, context: IWebPartContext) {
		super(props, context);
		this.state = {
			tasks: [],
			loaded: false
		};
    
		this._onChangeTasks = this._onChangeTasks.bind(this);
	};

  private _onChangeTasks(): void {		
    this.setState({
      tasks: listStore.getSearchResults(),
      loaded: true
    });
  }

  public componentDidMount(nextProps: ITasksSpfxProps): void {
		// Get the new results
    listStore.addChangeListener(this._onChangeTasks);
		this._getResults(this.props);
	}

	private _getResults(crntProps: ITasksSpfxProps): void {		      
			listActions.get(crntProps.context, crntProps.context.pageContext.user.loginName, crntProps.title, 10, "Descending", "ID");      
	}

  public render(): JSX.Element {    

    let tabsInstance = (
      <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Tab 1">{ this.state.tasks.length && <PendingTasksTable tasks={this.state.tasks} />}</Tab>
        <Tab eventKey={2} title="Tab 2"><ContactsTable context={this.props.context} /></Tab>
        <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
      </Tabs>
    );

    return (            
      <div className="container">        
        {tabsInstance}        
      </div>
    );    
  }
}
