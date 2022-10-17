import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'

class DeleteCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.deletecustomer.id,
            name: this.props.deletecustomer.name,
            address: this.props.deletecustomer.address,
            modalOpen: false,
        };
        this.DeleteCustomer = this.DeleteCustomer.bind(this);
    }

    handleClose = () => this.setState({modalOpen: false}, () => this.props.loadCustomer());
    handleOpen = () => this.setState({ modalOpen: true });

    DeleteCustomer() {

        const requestMetadata = { method: 'DELETE' };

        fetch(`api/Customer/${this.state.id}`, requestMetadata).then(res => res.text())
            .then(data => {
                this.setState({modalOpen: false}, this.props.loadCustomer());
                alert(data);
            }, (error) => {
                alert(error);
            }

            ).catch(error => {
                alert(error);
            });

    }

    render() {
        return (
            <Modal trigger={<Button onClick={this.handleOpen} color="red"> Delete </Button>}
                open={this.state.modalOpen} onClose={this.handleClose}>

                <Modal.Header> Delete Customer </Modal.Header>
                <Modal.Content>
                    <p> Are you sure to delete ? </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui red button" onClick={this.DeleteCustomer}> Delete </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DeleteCustomer;