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
import ContactForm from './ContactForm/ContactForm';

export interface ITasksSpfxProps extends IEmiPendingTasksWebPartProps {
	context: IWebPartContext;
	firstRender: Boolean;
  allTasks: Boolean; 	
}

export interface IContainerState {
  tasks?: ITaskResult[];
	loaded?: Boolean;	
  key?: Number;
}

export default class EmiPendingTasks extends React.Component<ITasksSpfxProps, IContainerState> {  

  constructor(props: ITasksSpfxProps, context: IWebPartContext) {
		super(props, context);
		this.state = {
			tasks: [],
			loaded: false,
      key: 2
		};
    
		this._onChangeTasks = this._onChangeTasks.bind(this);
    this.renderContacts = this.renderContacts.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.renderFormEdit = this.renderFormEdit.bind(this);
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

  private renderFormEdit(item) {
    this.handleSelect(3);
    this.render();
  }

  private renderContacts() {
    this.handleSelect(2);
  }

  private handleSelect(key) {    
    this.setState({key});
  }

  public render(): JSX.Element {    

    let tabsInstance = (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Tareas">{ this.state.tasks.length && <PendingTasksTable tasks={this.state.tasks} />}</Tab>
        <Tab eventKey={2} title="Contactos"><ContactsTable callBack={this.renderFormEdit} context={this.props.context} /></Tab>        
        <Tab eventKey={3} title="Form Contactos"><ContactForm callBack={this.renderContacts} context={this.props.context} /></Tab>
      </Tabs>
    );

    return (            
      <Grid>
        <Row>
          <Col lg={7}>{tabsInstance}</Col>
        </Row>  
      </Grid>
    );    
  }
}
