
import _ from 'lodash'
import React, { Component } from 'react';
import { Button, Table, Modal, Form } from 'semantic-ui-react'

import Footer from './Footer'
import { v4 as uuid } from 'uuid';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';



class CustomerDisplay extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            Customers: [], loading: true, name: "", address: "", modalOpen: false, column: null, direction: null
        };

        this.AddCustomer = this.AddCustomer.bind(this);
    }


    componentDidMount() {
      
        this.GetCustomer();       
     }
   
    handleSort = clickedColumn => {     
       
        const { column, Customers, direction } = this.state   
        
        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                Customers: _.sortBy(Customers, [clickedColumn]),
                direction: 'ascending',
            })
           
            return
        }
      
        this.setState({

            Customers: Customers.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',

        })
       
    }

    GetCustomer = () => {       
        fetch("api/Customer")
            .then(response => response.json())
            .then(data => {
                this.setState({ Customers: data, loading: false });
            });
    }

    handleClose = () => this.setState({
        modalOpen: false,
        name: "",
        address: "",
    }, () => this.GetCustomer());

    handleOpen = () => this.setState({ modalOpen: true });

    AddCustomer=() =>{
       
        let newCustomer = {
            id: uuid(),
            name: this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1),
            address: this.state.address.charAt(0).toUpperCase() + this.state.address.slice(1),
        };

         const requestMetadata = {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: {
                "Content-type": "application/json"
            }           
        };
      
        fetch("api/Customer", requestMetadata)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    Customers: [...this.state.Customers, data], modalOpen: false, name: "", address: ""
                })
                alert("Saved Successfully");
            }, (error) => {
                alert(error);
            }

        ).catch(error => {                
            alert(error);
            });
       
    }

   
    render() {

        const Customer = this.state.Customers;
        const isEnabled = (this.state.name != "") && (this.state.address != "")       
        const { column, direction } = this.state
        
       
        return (
            <>
                <div className="newDisplay">
                    <Modal trigger={<Button onClick={this.handleOpen} color="blue"> New Customer</Button>}
                        open={this.state.modalOpen} onClose={this.handleClose}>
                        <Modal.Header> Create Customer </Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Input label='Name' maxLength={45} placeholder='Name' type='text' onChange={e => this.setState({ name: e.target.value.toLowerCase() })} />
                                <Form.Input label='Address' maxLength={490} placeholder='Address' type='text' onChange={e => this.setState({ address: e.target.value.toLowerCase()})}/>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button secondary onClick={this.handleClose}>Cancel</Button>
                            <Button className="ui green button" disabled={!isEnabled} onClick={this.AddCustomer}>Create</Button>
                        </Modal.Actions>
                    </Modal>
                </div>
                <div className="tbleDisplay">
                    <Table sortable celled fixed  >
                        <Table.Header >
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={column === 'name' ? direction : null}
                                    onClick={() => this.handleSort('name')}
                                >Name</Table.HeaderCell>
                                <Table.HeaderCell sorted={column === 'address' ? direction : null}
                                    onClick={() => this.handleSort('address')}
                                >Address</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Customer.map(name => (
                                <Table.Row key={name.id}>

                                    <Table.Cell>{name.name}</Table.Cell>

                                    <Table.Cell>{name.address}</Table.Cell>

                                    <Table.Cell>
                                        <EditCustomer editcustomer={name} loadCustomer={this.GetCustomer} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DeleteCustomer deletecustomer={name} loadCustomer={this.GetCustomer} />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>

                    </Table>

                </div>
               
                <div className="newDisplay">
                    <Footer />
                </div>
                
            </>
        );
    }
}



export default CustomerDisplay;