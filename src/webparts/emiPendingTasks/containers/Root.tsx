import * as React from 'react';
import PropTypes from 'prop-types';
import {Router, hashHistory} from 'react-router';
import routes from '../routes';

const Root = () => (    
    <div>        
        <Router history={hashHistory} routes={routes}/>
    </div>    
);

// Root.propTypes = {
//     store: PropTypes.shape({}).isRequired
// };

export default Root;
