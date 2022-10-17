
import _ from 'lodash'
import React, { Component } from 'react';
import { Button, Table, Modal, Form } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import Footer from './Footer'


class ProductDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Products: [], loading: true, name: "", price: "00.00", modalOpen: false, column: null, direction: null
        };

        this.AddProduct = this.AddProduct.bind(this);
    }


    componentDidMount() {

        this.GetProduct();
    }

    handleSort = clickedColumn => {

        const { column, Products, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                Products: _.sortBy(Products, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({

            Products: Products.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',

        })

    }

    GetProduct = () => {
        fetch("api/Product")
            .then(response => response.json())
            .then(data => {
                this.setState({ Products: data, loading: false });
            });
    }

    handleClose = () => this.setState({
        modalOpen: false,
        name: "",
        price: "00.00",
    }, () => this.GetProduct());

    handleOpen = () => this.setState({ modalOpen: true });

    AddProduct = () => {
       
            let newProduct = {
            id: uuid(),
            name: this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1),
            price: this.state.price === "" ? "00.00" : this.state.price
        };
       
        const requestMetadata = {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                "Content-type": "application/json"
            }
        };

        fetch("api/Product", requestMetadata)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    Products: [...this.state.Products, data], modalOpen: false, name: "", price: "00.00"
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

        const Product = this.state.Products;
        const isEnabled = (this.state.name != "") && (this.state.price != "")
        const { column, direction } = this.state

        return (
            <>
                <div className="newDisplay">
                    <Modal trigger={<Button onClick={this.handleOpen} color="blue"> New Product</Button>}
                        open={this.state.modalOpen} onClose={this.handleClose}>
                        <Modal.Header> Create Product </Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Input label='Name' maxLength={45} placeholder='Name' type='text' onChange={e => this.setState({ name: e.target.value.toLowerCase() })} />
                                <Form.Input label='Price' maxLength={15} placeholder='00.00' type='number'  onChange={e => this.setState({ price: e.target.value})} />
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button secondary onClick={this.handleClose}>Cancel</Button>
                            <Button className="ui green button" disabled={!isEnabled} onClick={this.AddProduct}>Create</Button>
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
                                <Table.HeaderCell sorted={column === 'price' ? direction : null}
                                    onClick={() => this.handleSort('price')}
                                >Price</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Product.map(name => (
                                <Table.Row key={name.id}>

                                    <Table.Cell>{name.name}</Table.Cell>

                                    <Table.Cell>{'$' + name.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }</Table.Cell>

                                    <Table.Cell>
                                        <EditProduct editproduct={name} loadProduct={this.GetProduct} />
                                    </Table.Cell>

                                    <Table.Cell>
                                        <DeleteProduct deleteproduct={name} loadProduct={this.GetProduct} />
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



export default ProductDisplay;