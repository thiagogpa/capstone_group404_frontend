import React from "react";
import { Accordion, Card } from "react-bootstrap";
import "./faq-component-style.css";

export function FaqCard(props) {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={props.question.id}>
        {props.question.name}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.question.id}>
        <Card.Body>{props.question.answer}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

function FaqCardList(props) {
  return (
    <div className="faq-list">
      <Accordion defaultActiveKey="0">
        {props.questions.map((question) => (
          <FaqCard key={question.id} question={question} />
        ))}
      </Accordion>
    </div>
  );
}

export default FaqCardList;
