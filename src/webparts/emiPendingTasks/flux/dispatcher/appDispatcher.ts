import * as flux from 'flux';
import {IListAction} from '../actions/IListAction';

const appDispatcher: flux.Dispatcher<IListAction> = new flux.Dispatcher();
export default appDispatcher;