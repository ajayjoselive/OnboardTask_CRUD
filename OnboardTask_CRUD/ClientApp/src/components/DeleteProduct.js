import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'

class DeleteProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.deleteproduct.id,
            name: this.props.deleteproduct.name,
            price: this.props.deleteproduct.price,
            modalOpen: false,
        };
        this.DeleteProduct = this.DeleteProduct.bind(this);
    }

    handleClose = () => this.setState({ modalOpen: false }, () => this.props.loadProduct());
    handleOpen = () => this.setState({ modalOpen: true });

    DeleteProduct() {

        const requestMetadata = { method: 'DELETE' };

        fetch(`api/Product/${this.state.id}`, requestMetadata).then(res => res.text())
            .then(data => {
                this.setState({ modalOpen: false }, this.props.loadProduct());
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

                <Modal.Header> Delete Product </Modal.Header>
                <Modal.Content>
                    <p> Are you sure to delete ? </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui red button" onClick={this.DeleteProduct}> Delete </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DeleteProduct;