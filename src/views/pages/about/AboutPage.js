import React from 'react'
import { PageHeader, Panel } from 'react-bootstrap'
import { Container } from '../../components'

const AboutPage = (props) => {
  return (
    <Container>
      <PageHeader>About</PageHeader>
      <Panel>
        <Panel.Heading>Panel heading without a title</Panel.Heading>
        <Panel.Body>Panel content</Panel.Body>
      </Panel>
    </Container>
  )
}

export default AboutPage
