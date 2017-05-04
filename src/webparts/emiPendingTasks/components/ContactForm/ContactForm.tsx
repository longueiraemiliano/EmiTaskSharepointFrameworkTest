import * as React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import  listActions from '../../flux/actions/listActions';
import listStore from '../../flux/stores/listStore';

export interface IContactForm {
    nombre?: string,
    apellido?: string,
    id?: number,
    email?: string,
    phone?: string
}

export interface IContactFormProps {
	context: IWebPartContext;	
}

export default class ContactForm extends React.Component<IContactFormProps, IContactForm> {
    constructor(props) {        
		super(props);	 
        this.state = {
            nombre: "",
            apellido: "",
            id: 0,
            email: "",
            phone: ""
        };        
 
        this.getValidationState = this.getValidationState.bind(this);
        this.handleChangeNombre = this.handleChangeNombre.bind(this);
        this.handleChangeApellido = this.handleChangeApellido.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.addContact = this.addContact.bind(this);
	};
 
    private getValidationState() {
        const length = this.state.nombre.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    private handleChangeNombre(e) {
        this.setState({ nombre: e.target.value });
    }

    private handleChangeApellido(e) {
        this.setState({ apellido: e.target.value });
    }

    private handleChangePhone(e) {
        this.setState({ phone: e.target.value });
    }

    private handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    private addContact(e) {
        e.preventDefault();
        debugger;
        listActions.addContact(this.props.context, 'Contacts', this.state);
    }

    public render(): JSX.Element {           
        return (
            <form onSubmit={this.addContact}>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}>
                    <ControlLabel>Working example with validation</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.nombre}
                        placeholder="Nombre"
                        onChange={this.handleChangeNombre} />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        type="text"
                        value={this.state.apellido}
                        placeholder="Apellido"
                        onChange={this.handleChangeApellido} />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        type="text"
                        value={this.state.phone}
                        placeholder="Phone"
                        onChange={this.handleChangePhone} />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        type="text"
                        value={this.state.email}
                        placeholder="Email"
                        onChange={this.handleChangeEmail} />                    
                </FormGroup>
                <FormGroup>
                    <FormControl.Feedback />
                    <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <Button type="submit">
                        Submit
                    </Button>
                </FormGroup>
            </form>
        );
    }
}