import React, { useState } from "react";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";

const SubjectRegistration: React.FC = () => {
  // State variables to store subject details and error messages
  const [subjectName, setSubjectName] = useState("");

  const [subjectNameError, setSubjectNameError] = useState("");

  // Function to validate the form before submission
  const validateForm = () => {
    let isValid = true;

    // Validate Subject Name
    if (!subjectName.trim()) {
      setSubjectNameError("Subject Name is required");
      isValid = false;
    } else {
      setSubjectNameError("");
    }

    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid before submitting
    if (validateForm()) {
      // Perform further actions like saving subject details to the database
    }
  };

  return (
    <div>
      <h2>Subject Registration</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="subjectName">Subject Name *</Label>
          <Input
            type="text"
            name="subjectName"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
          {subjectNameError && <div className="error">{subjectNameError}</div>}
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default SubjectRegistration;
