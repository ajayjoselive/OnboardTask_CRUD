import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.editproduct.id,
            name: this.props.editproduct.name,
            price: this.props.editproduct.price,
            modalOpen: false,


        };
        this.UpdateProduct = this.UpdateProduct.bind(this);

    }

    handleClose = () => this.setState({ modalOpen: false }, () => this.props.loadProduct());
    handleOpen = () => this.setState({ modalOpen: true });

    UpdateProduct() {

        let updateProduct = {
            Id: this.state.id,
            name: this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1),
            price: this.state.price === "" ? "00.00" : this.state.price
        };



        const requestMetadata = {
            method: 'PUT',
            body: JSON.stringify(updateProduct),
            headers: {
                "Content-type": "application/json"
            }
        };

        fetch(`api/Product/${this.state.id}`, requestMetadata)
            .then(res => res.json())
            .then(() => {
                this.setState({
                    modalOpen: false
                }, this.props.loadProduct());
                alert("Updated Successfully");
            }, (error) => {
                alert(error);
            }

            ).catch(error => {
                alert(error);
            });



    }

    render() {
        const isEnabled = (this.state.name != "") && (this.state.price != "")
        return (
            <Modal trigger={<Button onClick={this.handleOpen} color="yellow"> Edit </Button>}
                open={this.state.modalOpen} onClose={this.handleClose}>


                <Modal.Header> Edit Product </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input label='Name' maxLength={50} placeholder='Name' type='text' value={this.state.name} onChange={e => this.setState({ name: e.target.value.toLowerCase() })} />
                        <Form.Input label='Price' maxLength={15} placeholder='00.00' type='number' value={this.state.price} onChange={e => this.setState({ price: e.target.value })} />
                       
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui green button" disabled={!isEnabled} onClick={this.UpdateProduct}> Edit </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default EditProduct;