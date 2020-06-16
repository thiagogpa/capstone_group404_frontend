import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Col,
  InputGroup,
  Jumbotron,
} from "react-bootstrap";

import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  message: Yup.string().required("Message is required"),
});

function Contact() {
  return (
    <Container>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Jumbotron>
            <Formik
              validationSchema={validationSchema}
              onSubmit={console.log}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                message: "",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="validationFormik01">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="John"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName && touched.firstName}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="validationFormik01">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Doe"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName && touched.lastName}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="validationFormik02">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="john.doe@example.com"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email && touched.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="validationFormik03">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        type="text"
                        as="textarea"
                        rows="3"
                        placeholder="message"
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        isInvalid={!!errors.message && touched.message}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Button type="submit">Send Message</Button>
                  </Form.Row>
                </Form>
              )}
            </Formik>
          </Jumbotron>
        </div>
      </div>
    </Container>
  );
}

export default Contact;
