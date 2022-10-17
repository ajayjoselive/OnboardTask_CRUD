import React from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react'

function Header() {
    return (
        <header style={headerstyle}>
            <Menu fixed='top' inverted>
                <Container>  
                    <Menu.Item header as={NavLink} exact to="/" children="React" />
                    <Menu.Item header as={NavLink} exact to="/customer" children="Customer" />
                    <Menu.Item header as={NavLink} exact to="/products" children="Products" />
                    <Menu.Item header as={NavLink} exact to="/store" children="Stores" />
                    <Menu.Item header as={NavLink} exact to="/sale" children="Sales" />
                   
                </Container>
            </Menu>
        </header>
    )

}

const headerstyle = {
    background: 'black',
    border: '2px solid black',
    padding: '25px',
}

export default Header;