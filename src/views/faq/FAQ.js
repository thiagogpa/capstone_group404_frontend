import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
} from "@coreui/react";

function FAQ() {
  const [accordion, setAccordion] = useState();
  const [faqs, setFaq] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/faq"
      )
      .then((response) => {
        setFaq(response.data);
      });
  }, []);

  const handleOnClickFaq = (question) => {
    console.log(question);
    setAccordion(accordion === question.id ? null : question.id);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <div id="accordion">
              {faqs.map((faq) => (
                <CCard className="mb-0">
                  <CCardHeader id={faq.id}>
                    <CButton
                      block
                      color="#636f83"
                      className="text-left m-0 p-0"
                      onClick={() => handleOnClickFaq(faq)}
                    >
                      <h5 className="m-0 p-0">{faq.name}</h5>
                    </CButton>
                  </CCardHeader>
                  <CCollapse show={accordion === faq.id}>
                    <CCardBody>{faq.answer}</CCardBody>
                  </CCollapse>
                </CCard>
              ))}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default FAQ;
