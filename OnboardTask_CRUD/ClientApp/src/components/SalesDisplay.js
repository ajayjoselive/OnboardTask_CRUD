import _ from 'lodash'
import React, { Component } from 'react';
import { Button, Table, Modal,Form } from 'semantic-ui-react'
import Footer from './Footer'
import { v4 as uuid } from 'uuid';
import EditSale from './EditSale';
import DeleteSale from './DeleteSale';

class SalesDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = { Sales: [], loading: true, Customers: [], Products: [], Stores: [], id: "", product: "", customer: "", store: "", date: "", modalOpen: false };
        this.AddSale = this.AddSale.bind(this);
    }

    componentDidMount() {
        this.getSale();
        this.getCustomer();
        this.getProduct();
        this.getStore();
    }

    getCustomer = () => {
        fetch('api/Customer')
            .then(response => response.json())
            .then(data => {
                this.setState({ Customers: data, loading: false });
            });
    }

    getProduct = () => {
        fetch('api/Product')
            .then(response => response.json())
            .then(data => {
                this.setState({ Products: data, loading: false });
            });
    }

    getStore = () => {
        fetch('api/Store')
            .then(response => response.json())
            .then(data => {
                this.setState({ Stores: data, loading: false });
            });
    }

    getSale = () => {
      
       fetch('api/Sales')
            .then(response => response.json())
            .then(data => {
                this.setState({ Sales: data, loading: false });
                
            }

       );

        
    }
    handleSort = clickedColumn => {

        const { column, Sales, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                Sales: _.sortBy(Sales, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({

            Sales: Sales.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',

        })

    }
    handleClose = () => this.setState({
        modalOpen: false,
        product: "",
        customer: "",
        store: "",
        date: "",
    }, () => this.getSale());

    handleOpen = () => this.setState({ modalOpen: true });

    AddSale() {

        let newSales = {
            id: uuid(),
            productId: this.state.product,
            customerId: this.state.customer,
            storeId: this.state.store,
            DateSold: this.state.date,
        };

        const requestMetadata = {
            method: 'POST',
            body: JSON.stringify(newSales),
            headers: {
                "Content-type": "application/json"
            }
        };

       
        fetch("api/Sales", requestMetadata)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    Sales: [...this.state.Sales, data], modalOpen: false, product: "", customer: "", store: "", date: ""
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

        

        const Sale = this.state.Sales;    
        const Customer = this.state.Customers;
        const Product = this.state.Products;
        const Store = this.state.Stores;

        

        const customerOption = Customer.map(customer => ({
            key: customer.id,
            text: customer.name,
            value: customer.id,

        }));

        const productOption = Product.map(product => ({
            key: product.id,
            text: product.name,
            value: product.id,

        }));
        const storeOption = Store.map(store => ({
            key: store.id,
            text: store.name,
            value: store.id,

        }));

        const isEnabled = (this.state.date != "") && (this.state.product != "") && (this.state.customer != "") && (this.state.store != "")
        const { column, direction } = this.state

        return (
            <div>
                <div className="newDisplay">
                    <Modal trigger={<Button onClick={this.handleOpen} color="blue"> Add Sale</Button>}
                        open={this.state.modalOpen} onClose={this.handleClose}>                      

                        <Modal.Header> Create Sale </Modal.Header>

                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <Form.Input
                                       
                                        onChange={e => this.setState({ date: e.target.value })}
                                        label="Date"
                                        placeholder="Date"
                                        type="date"
                                    />
                                
                            </Form.Field>
                            <Form.Select 
                                    fluid
                                    selection
                                label="Customer"
                                name="customer"
                                    options={customerOption}
                                   
                                    placeholder="Customer"
                                    onChange={(e, { value }) => { this.setState({ customer: value }) }}
                             />
                                 


                                <Form.Select
                                    fluid
                                    selection
                                    label="Product"
                                    name="product"
                                    options={productOption}
                                    placeholder="Product"
                                    onChange={(e, { value }) => { this.setState({ product: value }) }}
                                />

                                <Form.Select
                                    fluid
                                    selection
                                    label="Store"
                                    name="Store"
                                    options={storeOption}
                                    placeholder="Store"
                                    onChange={(e, { value }) => { this.setState({ store: value }) }}
                                />
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button secondary onClick={this.handleClose}> Cancel </Button>
                            <Button className="ui green button" disabled={!isEnabled} onClick={this.AddSale}>Create</Button>
                        </Modal.Actions>
                    </Modal>
                </div>
                <div className="tbleDisplay">
                    <Table sortable celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell sorted={column === 'customerName' ? direction : null}
                                    onClick={() => this.handleSort('customerName')}  >Customer</Table.HeaderCell>
                                <Table.HeaderCell sorted={column === 'productName' ? direction : null}
                                    onClick={() => this.handleSort('productName')}  >Product</Table.HeaderCell>
                                <Table.HeaderCell sorted={column === 'storeName' ? direction : null}
                                    onClick={() => this.handleSort('storeName')}  >Store</Table.HeaderCell>
                                <Table.HeaderCell  >DateSold</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Sale.map(name => (
                                <Table.Row key={name.salesId}>

                                    <Table.Cell>{name.customerName}</Table.Cell>

                                    <Table.Cell>{name.productName}</Table.Cell>

                                    <Table.Cell>{name.storeName}</Table.Cell>

                                    <Table.Cell>{name.salesDateSold}</Table.Cell>

                                    <Table.Cell>
                                        <EditSale editsale={name} loadSale={this.getSale} />
                                    </Table.Cell>

                                    <Table.Cell>
                                        <DeleteSale deletesale={name} loadSale={this.getSale} />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>

                    </Table>
                </div>
                <div className="newDisplay">
                    <Footer />
                </div>
            </div>
        );
    }
}

const btnstyle = {
    border: '1px solid black',
    padding: '2px',
    float: 'right',
    flex: 'auto'
}

export default SalesDisplay;