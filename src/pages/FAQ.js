import React from "react";
import axios from "axios";
import FaqCardList from "../components/faq/faq-component.jsx";

import { Badge, Container, Row, Col, Jumbotron } from "react-bootstrap";
import "./FAQ-style.css";

export default class FAQ extends React.Component {
  state = {
    faq: [],
  };

  componentDidMount() {
    axios.get("https://cors-anywhere.herokuapp.com/https://thiagogpa.000webhostapp.com/json/faqAPI.json").then((response) => {
      this.setState({ faq: response.data });      
    });
  }

  render() {
    return (
      <div className="content">
        <Container fluid="md">
          <Jumbotron>
            <Row>
              <Col>
                <h1 className="title">
                  Frequently asked questions{" "}
                  <Badge variant="secondary">FAQ</Badge>
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <FaqCardList questions={this.state.faq} />
              </Col>
            </Row>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}
