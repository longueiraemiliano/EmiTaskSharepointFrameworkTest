import * as React from 'react';
import * as ReactDom from 'react-dom';
import Root from './containers/Root';
import RouteMap from './routes/index';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'emiPendingTasksStrings';
import EmiPendingTasks, { ITasksSpfxProps } from './components/EmiPendingTasks';
import { IEmiPendingTasksWebPartProps } from './IEmiPendingTasksWebPartProps';

import { SPComponentLoader, ILoadScriptOptions } from '@microsoft/sp-loader';
import { defer, IDeferred } from './utils/defer';

export default class EmiPendingTasksWebPart extends BaseClientSideWebPart<any> {

  private _getElement(): React.ReactElement<ITasksSpfxProps> {
		let pending = React.createElement(RouteMap, {
      context: this.context,
      title: this.properties.title,
      allTasks: false,
      firstRender: true,
      description: this.properties.description
    });

    return pending;
	}

  public render(): void {    
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
    SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap-table/3.3.0/react-bootstrap-table-all.min.css');        
    const element = this._getElement();
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription            
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldsLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
