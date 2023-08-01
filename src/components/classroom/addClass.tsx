import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid before submitting
    if (validateForm()) {
      // Dispatch an action to add classroom data to the Redux store
      const newClassroom: Classroom = {
        classroomName,
      };
      // Example: dispatch(addClassroom(newClassroom));
      // Implement the addClassroom action based on your Redux setup
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
