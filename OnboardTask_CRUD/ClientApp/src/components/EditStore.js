import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

class EditStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.editstore.id,
            name: this.props.editstore.name,
            address: this.props.editstore.address,
            modalOpen: false,


        };
        this.UpdateStore = this.UpdateStore.bind(this);

    }

    handleClose = () => this.setState({ modalOpen: false }, () => this.props.loadstore());
    handleOpen = () => this.setState({ modalOpen: true });

    UpdateStore() {

        let updateStore = {
            Id: this.state.id,
            Name: this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1),
            Address: this.state.address.charAt(0).toUpperCase() + this.state.address.slice(1)
        };



        const requestMetadata = {
            method: 'PUT',
            body: JSON.stringify(updateStore),
            headers: {
                "Content-type": "application/json"
            }
        };

        fetch(`api/Store/${this.state.id}`, requestMetadata)
            .then(res => res.json())
            .then(() => {
                this.setState({
                    modalOpen: false
                }, this.props.loadstore());
                alert("Updated Successfully");
            }, (error) => {
                alert(error);
            }

            ).catch(error => {
                alert(error);
            });



    }

    render() {
        const isEnabled = (this.state.name != "") && (this.state.address != "")
        return (
            <Modal trigger={<Button onClick={this.handleOpen} color="yellow"> Edit </Button>}
                open={this.state.modalOpen} onClose={this.handleClose}>


                <Modal.Header> Edit Store </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input fluid label='Name' maxLength={50} placeholder='Name' type='text' value={this.state.name} onChange={e => this.setState({ name: e.target.value.toLowerCase() })} />
                        <Form.Input fluid label='Address' maxLength={500} placeholder='Address' type='text' value={this.state.address} onChange={e => this.setState({ address: e.target.value.toLowerCase() })} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui green button" disabled={!isEnabled} onClick={this.UpdateStore}> Edit </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default EditStore;