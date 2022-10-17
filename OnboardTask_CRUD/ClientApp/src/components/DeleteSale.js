import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'

class DeleteSale extends Component {
    constructor(props) {
        super(props);

        let current_datetime = new Date(this.props.deletesale.salesDateSold);
        let formatted_date = current_datetime.getFullYear() + "-" + ("0" + (current_datetime.getMonth() + 1)).slice(-2) + "-" + ("0" + current_datetime.getDate()).slice(-2) 
        
        this.state = {
           
            Id: this.props.deletesale.salesId,
            productId: this.props.deletesale.productId,
            customerId: this.props.deletesale.customerId,
            storeId: this.props.deletesale.storeId,
            salesDateSold: formatted_date,
            modalOpen: false,
        };

        this.DeleteSale= this.DeleteSale.bind(this)
    }

    handleClose = () => this.setState({
        modalOpen: false,
    }, () => this.props.loadSale());

    handleOpen = () => this.setState({ modalOpen: true });

    DeleteSale() {

        
        const requestMetadata = { method: 'DELETE' };

        fetch(`api/Sales/${this.state.Id}`, requestMetadata).then(res => res.text())
            .then(data => {
                this.setState({ modalOpen: false }, this.props.loadSale());
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
                <Modal.Header> Delete Sale </Modal.Header>
                <Modal.Content>
                    <p> Are you sure? </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>Cancel</Button>
                    <Button className="ui red button" onClick={this.DeleteSale}> Delete </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DeleteSale;