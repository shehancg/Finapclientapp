import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";

const StudentRegistration: React.FC = () => {
  const dispatch = useDispatch();

  // State variables to store student details and error messages
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [classroom, setClassroom] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [contactPersonError, setContactPersonError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [classroomError, setClassroomError] = useState("");

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

    // Validate Last Name
    if (!lastName.trim()) {
      setLastNameError("Last Name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    // Validate Contact Person
    if (!contactPerson.trim()) {
      setContactPersonError("Contact Person is required");
      isValid = false;
    } else {
      setContactPersonError("");
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
    if (!email.trim()) {
      setEmailError("Email Address is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid Email Address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate Date of Birth
    if (!dateOfBirth.trim()) {
      setDateOfBirthError("Date of Birth is required");
      isValid = false;
    } else {
      setDateOfBirthError("");
    }

    // Validate Classroom
    if (!classroom.trim()) {
      setClassroomError("Classroom is required");
      isValid = false;
    } else {
      setClassroomError("");
    }

    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid before submitting
    if (validateForm()) {
      // Dispatch an action to add student data to the Redux store
      // Example: dispatch(addStudent(firstName, lastName, ...));
    }
  };

  return (
    <div>
      <h2>Student Registration</h2>
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
          <Label for="lastName">Last Name *</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {lastNameError && <div className="error">{lastNameError}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="contactPerson">Contact Person *</Label>
          <Input
            type="text"
            name="contactPerson"
            id="contactPerson"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          />
          {contactPersonError && <div className="error">{contactPersonError}</div>}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error">{emailError}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="dateOfBirth">Date of Birth *</Label>
          <Input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          {dateOfBirthError && <div className="error">{dateOfBirthError}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="classroom">Classroom *</Label>
          <Input
            type="select"
            name="classroom"
            id="classroom"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
          >
            <option value="">Select Classroom</option>
            <option value="classroom1">Classroom 1</option>
            <option value="classroom2">Classroom 2</option>
            {/* Add more options based on your data */}
          </Input>
          {classroomError && <div className="error">{classroomError}</div>}
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default StudentRegistration;
