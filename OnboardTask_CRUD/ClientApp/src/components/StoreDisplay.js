
import _ from 'lodash'
import React, { Component } from 'react';
import { Button, Table, Modal, Form } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import EditStore from './EditStore';
import DeleteStore from './DeleteStore';
import Footer from './Footer'


class StoreDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Stores: [], loading: true, name: "", address: "", modalOpen: false, column: null, direction: null
        };

        this.AddStore = this.AddStore.bind(this);
    }


    componentDidMount() {

        this.GetStore();
    }

    handleSort = clickedColumn => {

        const { column, Stores, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                Stores: _.sortBy(Stores, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({

            Stores: Stores.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',

        })

    }

    GetStore = () => {
        fetch("api/Store")
            .then(response => response.json())
            .then(data => {
                this.setState({ Stores: data, loading: false });
            });
    }

    handleClose = () => this.setState({
        modalOpen: false,
        name: "",
        address: "",
    }, () => this.GetStore());

    handleOpen = () => this.setState({ modalOpen: true });

    AddStore = () => {

        let newStore = {
            id: uuid(),
            name: this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1),
            address: this.state.address.charAt(0).toUpperCase() + this.state.address.slice(1),
        };

        const requestMetadata = {
            method: 'POST',
            body: JSON.stringify(newStore),
            headers: {
                "Content-type": "application/json"
            }
        };

        fetch("api/Store", requestMetadata)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    Stores: [...this.state.Stores, data], modalOpen: false, name: "", address: ""
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

        const Store = this.state.Stores;
        const isEnabled = (this.state.name != "") && (this.state.address != "")
        const { column, direction } = this.state


        return (
            <>
                <div className="newDisplay">
                    <Modal trigger={<Button onClick={this.handleOpen} color="blue">New Store</Button>}
                        open={this.state.modalOpen} onClose={this.handleClose}>
                        <Modal.Header> Create Store </Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Input label='Name' maxLength={45} placeholder='Name' type='text' onChange={e => this.setState({ name: e.target.value.toLowerCase() })} />
                                <Form.Input label='Address' maxLength={490} placeholder='Address' type='text' onChange={e => this.setState({ address: e.target.value.toLowerCase() })} />
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button secondary onClick={this.handleClose}>Cancel</Button>
                            <Button className="ui green button" disabled={!isEnabled} onClick={this.AddStore}>Create</Button>
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
                            {Store.map(name => (
                                <Table.Row key={name.id}>

                                    <Table.Cell>{name.name}</Table.Cell>

                                    <Table.Cell>{name.address}</Table.Cell>

                                    <Table.Cell>
                                        <EditStore editstore={name} loadstore={this.GetStore} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DeleteStore deletestore={name} loadstore={this.GetStore} />
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



export default StoreDisplay;