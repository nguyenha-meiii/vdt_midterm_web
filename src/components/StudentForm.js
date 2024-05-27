import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

const FormWrapper = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: auto;
`;

const FormControl = styled.div`
    margin-bottom: 20px;
`;

const validate = (values) => {
    const errors = {};
    if (!values.fullName) {
        errors.fullName = "Required";
    }
    if (!values.doB) {
        errors.doB = "Required";
    }
    if (!values.gender) {
        errors.gender = "Required";
    }
    if (!values.school) {
        errors.school = "Required";
    }
    if (!values.major) {
        errors.major = "Required";
    }
    return errors;
};

const StudentForm = (props) => {
    return (
        <FormWrapper>
            <Formik {...props} validate={validate}>
                <Form>
                    <FormControl>
                        <Field name="fullName">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        </Field>
                        <ErrorMessage
                            name="fullName"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormControl>

                    <FormControl>
                        <Field name="doB">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Year of Birth"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        </Field>
                        <ErrorMessage
                            name="doB"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormControl>

                    <FormControl>
                        <Field name="gender">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Gender"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        </Field>
                        <ErrorMessage
                            name="gender"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormControl>

                    <FormControl>
                        <Field name="school">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="School"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        </Field>
                        <ErrorMessage
                            name="school"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormControl>

                    <FormControl>
                        <Field name="major">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Major"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        </Field>
                        <ErrorMessage
                            name="major"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormControl>

                    <Button variant="danger" size="lg" block="block" type="submit">
                        {props.children}
                    </Button>
                </Form>
            </Formik>
        </FormWrapper>
    );
};

export default StudentForm;
