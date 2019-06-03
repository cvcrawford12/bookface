import React, { Component } from 'react';
import { Container, Card, CardBody, Row, Col } from 'reactstrap';
import { Facebook } from 'react-content-loader';
import SearchLoader from './SearchLoader';

class Loader extends Component {
  render() {
    if (this.props.loading !== false) {
      if (this.props.social) {
        return (
          <Container>
            <Card>
              <CardBody>
                <SearchLoader />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <SearchLoader />
              </CardBody>
            </Card>
          </Container>
        )
      } else if (this.props.multiple) {
          return (
            <Container>
              <Row>
                <Col sm={{size: 3, offset: 0}} xs={{size: 10, offset: 1}}>
                  <Card style={{minHeight: '20rem'}}><CardBody><SearchLoader /></CardBody></Card>
                </Col>
                <Col sm={{size: 3, offset: 0}} xs={{size: 10, offset: 1}}>
                  <Card style={{minHeight: '20rem'}}><CardBody><SearchLoader /></CardBody></Card>
                </Col>
                <Col sm={{size: 3, offset: 0}} xs={{size: 10, offset: 1}}>
                  <Card style={{minHeight: '20rem'}}><CardBody><SearchLoader /></CardBody></Card>
                </Col>
                <Col sm={{size: 3, offset: 0}} xs={{size: 10, offset: 1}}>
                  <Card style={{minHeight: '20rem'}}><CardBody><SearchLoader /></CardBody></Card>
                </Col>
              </Row>
            </Container>
          )
        } else {
          return (
            <Container><Card><CardBody><SearchLoader /></CardBody></Card></Container>
          )
        }
    } else {
      return (
        this.props.children
      )
    }
  }
}

export default Loader;
