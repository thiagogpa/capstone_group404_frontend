import React from "react";
import { Accordion, Card } from "react-bootstrap";
import "./faq-component-style.css";

export function FaqCard({id, name, answer}) {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={id}>
        {name}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>{answer}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

function FaqCardList(props) {
  return (
    <div className="faq-list">
      <Accordion defaultActiveKey="0">
        {props.questions.map(({id, ...sectionProps }) => (
          <FaqCard key={id} id={id} {...sectionProps} />
        ))}
      </Accordion>
    </div>
  );
}

export default FaqCardList;
