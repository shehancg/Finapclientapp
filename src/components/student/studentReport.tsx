import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";
import api from "../../api";

// Interface for the student object
interface Student {
  studentID: number;
  firstName: string;
  fullname: string;
  contactPerson:string;
  contactNo: string;
  classroomName: string;
  emailAddress: string;
  dateOfBirth: string;
}

const StudentReport: React.FC = () => {
  // State variables to store student details
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [studentDetails, setStudentDetails] = useState<Student>({
    studentID: 0,
    firstName: "",
    fullname:"",
    contactPerson:"",
    contactNo: "",
    classroomName: "",
    emailAddress: "",
    dateOfBirth: "",
  });
  const [students, setStudents] = useState<Student[]>([]); // Add this state variable

  // Function to fetch students from API
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Fetch students from the API and set them in the state
      const response = await api.get("/api/student");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Function to handle student selection from the drop-down
  const handleStudentSelection = (selectedStudentId: number) => {
    setSelectedStudent(selectedStudentId);
    // Make an API call to get the student details based on the selected studentID
    fetchStudentDetails(selectedStudentId);
  };

  const fetchStudentDetails = async (studentId: number) => {
    try {
      // Fetch student details from the API
      const response = await api.get(`/api/StudentDto/${studentId}`);
      setStudentDetails(response.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  return (
    <div>
      <h2>Student Report</h2>
      <Form>
        <FormGroup>
          <Label for="student">Select Student</Label>
          <Input
            type="select"
            name="student"
            id="student"
            value={selectedStudent || ""}
            onChange={(e) => handleStudentSelection(Number(e.target.value))}
          >
            <option value="">Select Student</option>
            
            {students.map((student) => (
              <option key={student.studentID} value={student.studentID}>
                {student.firstName}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="firstName">Contact Person</Label>
          <Input type="text" name="firstName" id="firstName" value={studentDetails.contactPerson} readOnly />
        </FormGroup>
        <FormGroup>
          <Label for="contactNo">Contact Number</Label>
          <Input type="text" name="contactNo" id="contactNo" value={studentDetails.contactNo} readOnly />
        </FormGroup>
        <FormGroup>
          <Label for="classroom">Classroom</Label>
          <Input type="text" name="classroom" id="classroom" value={studentDetails.classroomName} readOnly />
        </FormGroup>
        <FormGroup>
          <Label for="emailAddress">Email Address</Label>
          <Input type="text" name="emailAddress" id="emailAddress" value={studentDetails.emailAddress} readOnly />
        </FormGroup>
        <FormGroup>
          <Label for="dateOfBirth">Date of Birth</Label>
          <Input type="text" name="dateOfBirth" id="dateOfBirth" value={studentDetails.dateOfBirth} readOnly />
        </FormGroup>
      </Form>
    </div>
  );
};

export default StudentReport;
