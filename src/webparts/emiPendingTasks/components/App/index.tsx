import * as React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

export default class App extends React.Component<any, any> { 
    render() {
        return (
            <div className="App">
                <Header/>
                <main>
                    {this.props.children}
                </main>
                <Footer/>
            </div>);
    }
}

// App.propTypes = {
//     children: PropTypes.oneOfType([
//         PropTypes.arrayOf(React.PropTypes.node),
//         PropTypes.node
//     ])
// };

// App.defaultProps = {
//     children: null
// };


