import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";
import api from "../../api";

interface Classroom {
  classroomName: string;
}

const StudentRegistration: React.FC = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]); // State variable to store classrooms
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [classroom, setClassroom] = useState("");


  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [contactPersonError, setContactPersonError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [classroomError, setClassroomError] = useState("");

  // Function to calculate age based on date of birth
  const calculateAge = (dateOfBirth: string): number => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Fetch classrooms from the API using useEffect
  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await api.get("/api/classrooms");
      setClassrooms(response.data); // Store the fetched classrooms in the state
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

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
    if (!emailAddress.trim()) {
      setEmailError("Email Address is required");
      isValid = false;
    } else if (!emailPattern.test(emailAddress)) {
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid before submitting
    if (validateForm()) {
      try {
        // Create a new student object with the form data
        const newStudent = {
          firstName,
          lastName,
          contactPerson,
          contactNo,
          emailAddress,
          dateOfBirth,
          classroom,
        };

        // Send the newStudent object to the API using the POST method
        const response = await api.post("/api/Student", newStudent);

        // Assuming the API returns the created student object, you can access it from the response data
        //const createdStudent = response.data;

        // Handle the API response here if needed
        console.log("Student added:", response.data);

        // Optionally, you can do something with the createdStudent, like displaying a success message or navigating to another page.

        // Clear the form fields after successful submission
        setFirstName("");
        setLastName("");
        setContactPerson("");
        setContactNo("");
        setEmail("");
        setDateOfBirth("");
        setClassroom("");

        // Reset any error messages
        setFirstNameError("");
        setLastNameError("");
        setContactPersonError("");
        setContactNoError("");
        setEmailError("");
        setDateOfBirthError("");
        setClassroomError("");
      } catch (error:any) {
        console.error("Error adding student:", error.response.data);
        // Handle any errors that occurred during the API call, e.g., display an error message to the user.
      }
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
            value={emailAddress}
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
          <Label for="age">Age *</Label>
          <Input
            type="text"
            name="age"
            id="age"
            value={dateOfBirth ? calculateAge(dateOfBirth) : ""}
            disabled
          />
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
            {classrooms.map((classroomOption) => (
              <option key={classroomOption.classroomName} value={classroomOption.classroomName}>
                {classroomOption.classroomName}
              </option>
            ))}
          </Input>
          {classroomError && <div className="error">{classroomError}</div>}
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default StudentRegistration;
