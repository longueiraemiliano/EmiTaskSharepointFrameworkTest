import * as React from 'react';
import {Image} from 'react-bootstrap';
import {Link} from 'react-router';

class Header extends React.Component<any, any> {
    constructor(props) {
        super(props);        
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed">
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <a className="logo">
                                <li>
                                    <Link to={'/'} style={{color: 'black'}}>
                                        {/*<Image alt="Impuestos" src={brandImage}/>*/}
                                    </Link>
                                </li>

                            </a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <Link to={'/sales'}>
                                        <span className="fa fa-shopping-bag"/>&nbsp;
                                        <span className="hide-text">Ventas</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/users'}>
                                        <span className="fa fa-gears"/>&nbsp;
                                        <span className="hide-text">Configuración</span>
                                    </Link>
                                </li>
                                <li>
                                    <a href="/signOut" title="Cerrar sesión">
                                        <span className="fa fa-power-off"/>&nbsp;
                                        <span className="hide-text">Cerrar sesión</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
