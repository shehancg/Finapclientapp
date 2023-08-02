import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";
import api from "../../api"; // Import the Axios instance from api.ts

interface Classroom {
  classroomName: string;
}

const Classrooms: React.FC = () => {
  const dispatch = useDispatch();

  // State variables to store classroom details and error messages
  const [classroomName, setClassroomName] = useState("");

  const [classroomNameError, setClassroomNameError] = useState("");

  // Function to validate the form before submission
  const validateForm = () => {
    let isValid = true;

    // Validate Classroom Name
    if (!classroomName.trim()) {
      setClassroomNameError("Classroom Name is required");
      isValid = false;
    } else {
      setClassroomNameError("");
    }

    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid before submitting
    if (validateForm()) {
      // Dispatch an action to add classroom data to the Redux store
      const newClassroom: Classroom = {
        classroomName,
      };
      try {
        // Send the data to the API
        const response = await api.post("/api/classrooms", newClassroom);

        // Handle the response from the API (if needed)
        console.log("Classroom added successfully:", response.data);

        // Clear the form after successful submission (if needed)
        setClassroomName("");

        setClassroomNameError("")

        // You can also dispatch an action to update the Redux store with the new classroom data
        // Example: dispatch(addClassroomToStore(response.data));
        // Implement the addClassroomToStore action based on your Redux setup
      } catch (error) {
        // Handle any errors that occurred during the API request
        console.error("Error adding classroom:", error);
      }
    }
  };

  return (
    <div>
      <h2>Classrooms</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="classroomName">Classroom Name *</Label>
          <Input
            type="text"
            name="classroomName"
            id="classroomName"
            value={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
          />
          {classroomNameError && <div className="error">{classroomNameError}</div>}
        </FormGroup>
        <Button type="submit">Add Classroom</Button>
      </Form>
    </div>
  );
};

export default Classrooms;
