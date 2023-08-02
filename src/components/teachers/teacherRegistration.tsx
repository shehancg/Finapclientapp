import React, { useState } from "react";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";
import api from "../../api";

const TeacherRegistration: React.FC = () => {
  // State variables to store teacher details and error messages
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailAddress, setEmail] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Function to validate the form before submission
  const validateForm = () => {
    let isValid = true;

    // Validate First Name
    if (!firstName.trim()) {
      setFirstNameError("First Name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    // Validate Contact No
    if (!contactNo.trim()) {
      setContactNoError("Contact No is required");
      isValid = false;
    } else {
      setContactNoError("");
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailAddress.trim()) {
      setEmailError("Email Address is required");
      isValid = false;
    } else if (!emailPattern.test(emailAddress)) {
      setEmailError("Invalid Email Address");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid before submitting
    if (validateForm()) {
      // Perform further actions like saving teacher details to the database
      const teacherData = {
        firstName,
        lastName,
        contactNo,
        emailAddress,
      };

      try {
        // Send the teacher data to the API using axios
        const response = await api.post("/api/Teacher", teacherData);

        // Handle the API response here if needed
        console.log("Teacher added:", response.data);

        // Clear the form fields after successful submission
        setFirstName("");
        setLastName("");
        setContactNo("");
        setEmail("");

        // Clear error messages
        setFirstNameError("");
        setFirstNameError("");
        setContactNoError("");
        setEmailError("");

      } catch (error:any) {
        // Handle any errors that occurred during the API call
        console.error("Error adding teacher:", error.response.data);
      }
    }
  };

  return (
    <div>
      <h2>Teacher Registration</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="firstName">First Name *</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameError && <div className="error">{firstNameError}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="contactNo">Contact No *</Label>
          <Input
            type="text"
            name="contactNo"
            id="contactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
          {contactNoError && <div className="error">{contactNoError}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="email">Email Address *</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={emailAddress}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error">{emailError}</div>}
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default TeacherRegistration;
