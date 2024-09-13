import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Landing = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center shadow-sm border-light">
            <Card.Body>
              <Card.Title as="h1">Welcome to MyApp</Card.Title>
              <Card.Text>
                This is a simple application to demonstrate React Router and Bootstrap styling.
              </Card.Text>
              <Row className="mt-4">
                <Col>
                  <Link to="/register">
                    <Button variant="primary" size="lg" className="w-100">
                      Register
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Link to="/login">
                    <Button variant="secondary" size="lg" className="w-100">
                      Login
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
