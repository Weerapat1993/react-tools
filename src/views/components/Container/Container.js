import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { SearchBar } from '../SearchBar'

const Container = ({ children }) => {
  return (
    <div>
      <Navbar inverse collapseOnSelect staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Weerapat (Top)</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <SearchBar />
          <Nav pullRight>
            <NavItem>
              <Link to='/'>Home</Link>
            </NavItem>
            <NavItem>
              <Link to='/about'>About</Link>
            </NavItem>
            <NavItem>
              <Link to='/profile'><FontAwesome name='github' /> Github</Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className='container'>
        {children}
      </div>
      <div style={{ marginTop: 60 }} />
      <Navbar fixedBottom>
        <Nav pull>
          <NavItem eventKey={1} href="#">
            weerapat1993.github.io
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default Container
