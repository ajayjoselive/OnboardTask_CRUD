import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'

class DeleteStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.deletestore.id,
            name: this.props.deletestore.name,
            address: this.props.deletestore.address,
            modalOpen: false,
        };
        this.DeleteStore = this.DeleteStore.bind(this);
    }

    handleClose = () => this.setState({ modalOpen: false }, () => this.props.loadstore());
    handleOpen = () => this.setState({ modalOpen: true });

    DeleteStore() {

        const requestMetadata = { method: 'DELETE' };

        fetch(`api/Store/${this.state.id}`, requestMetadata).then(res => res.text())
            .then(data => {
                this.setState({ modalOpen: false }, this.props.loadstore());
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

                <Modal.Header> Delete Store </Modal.Header>
                <Modal.Content>
                    <p> Are you sure to Store ? </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui red button" onClick={this.DeleteStore}> Delete </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DeleteStore;