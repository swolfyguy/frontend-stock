import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Options from '../Options/Options';
import { Route }  from 'react-router-dom';
import './Login.css';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPasswordValid: false,
      passwordEntered: false
    }
  }

  passwordChangeHandler = (event) => {
    const password = event.target.value;

    this.setState({
      passwordEntered: true
    });

    if (password.length < 5 || password.length > 10) {
      this.setState({
        isPasswordValid: false
      });
    } else {
      this.setState({
        isPasswordValid: true
      });
    }
  }

  optionsRedirect =(event) =>{
    <Route path="/options" exact component={Options} />
  }
  render() {
    let passwordBoxStyle = null;
    if (this.state.passwordEntered && !this.state.isPasswordValid) {
      passwordBoxStyle = {
        boxShadow: '0 0 2px 1px rgba(255, 0, 0, 1)',
      };
    }

    return (
      <Container className="Login">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="login-form-container">
              <Form>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="email" placeholder="Enter email" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="2">
                    Password
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="password" placeholder="Password" className="password-box" style={passwordBoxStyle} onChange={this.passwordChangeHandler} />
                  </Col>
                </Form.Group>
                <Col sm="2"  xs ={4}>
                    <Form.Control type="submit" placeholder="Login" className="login-button" onClick={this.optionsRedirect} />
                </Col>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
