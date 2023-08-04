import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Form, Button, Table } from "reactstrap";
import api from "../../api";

// Interface for the allocation object
interface Allocation {
  allocateSubjectId: number;
  teacherId: string;
  subjectId: string;
}

interface Teacher {
  teacherID: number;
  firstName: string;
  lastName: string;
  contactNo: string;
  emailAddress: string;
  allocatedSubjects: any[]; // Replace 'any[]' with the appropriate type for allocatedSubjects
  allocateClassrooms: any[]; // Replace 'any[]' with the appropriate type for allocateClassrooms
}

interface Subject {
  subjectId: number;
  subjectName: string;
  allocations: any[]; // Replace 'any[]' with the appropriate type for allocations
}

const AllocateSubjects: React.FC = () => {
  // State variables to store allocation details
  const [teacherId, setTeacherId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [allocatedSubjects, setAllocatedSubjects] = useState<Allocation[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedTeacherSubjects, setSelectedTeacherSubjects] = useState<string[]>([]);

  // Function to fetch teachers and subjects from APIs
  useEffect(() => {
    fetchTeachers();
    fetchSubjects();
  }, []);

  const fetchTeachers = async () => {
    try {
      // Fetch teachers from the API and set them in the state
      const response = await api.get("/api/teacher");
      setTeachers(response.data); // Assuming the API returns an array of teacher names
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      // Fetch subjects from the API and set them in the state
      const response = await api.get("/api/subject");
      setSubjects(response.data); // Assuming the API returns an array of subject names
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Function to handle teacher selection from the drop-down
  const handleTeacherSelection = async (selectedTeacherId: string) => {
    try {
      // Fetch the teacher's subjects from the API based on the selected teacher ID
      const response = await api.get(`/api/AllocateSubject/teacher/${selectedTeacherId}`);
      const subjects = response.data.map((subject: any) => subject.subjectName);

      // Update the selectedTeacherSubjects state with the teacher's subjects
      setSelectedTeacherSubjects(subjects);
    } catch (error) {
      console.error("Error fetching teacher's subjects:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if both teacherId and subjectId are selected
    if (teacherId && subjectId) {
      try {
        // Allocate subject to teacher
        const newAllocation: Allocation = {
          allocateSubjectId: Date.now(), // You can use a proper ID generation mechanism here
          teacherId: teacherId,
          subjectId: subjectId,
        };

        // Make an API call to save the allocation
        await api.post("/api/AllocateSubject", {
          teacherId: Number(newAllocation.teacherId),
          subjectId: Number(newAllocation.subjectId),
        });

        // Update the allocatedSubjects state with the new allocation
        setAllocatedSubjects([...allocatedSubjects, newAllocation]);

        // Clear the form fields after allocation
        setTeacherId("");
        setSubjectId("");
      } catch (error) {
        console.error("Error allocating subject:", error);
      }
    } else {
      // Display an error message if both teacher and subject are not selected
      alert("Please select both teacher and subject to allocate.");
    }
  };

  // Function to handle subject allocation deletion
  const handleDelete = async (allocationId: number) => {
    try {
      // Make an API call to delete the allocation
      await api.delete(`/api/AllocateSubjects/${allocationId}`);

      // Update the allocatedSubjects state after deletion
      const updatedAllocations = allocatedSubjects.filter(
        (allocation) => allocation.allocateSubjectId !== allocationId
      );
      setAllocatedSubjects(updatedAllocations);
    } catch (error) {
      console.error("Error deleting allocation:", error);
    }
  };

  return (
    <div>
      <h2>Allocate Subjects</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="teacher">Teacher *</Label>
          <Input
            type="select"
            name="teacher"
            id="teacher"
            value={teacherId}
            onChange={(e) => {
              setTeacherId(e.target.value);
              handleTeacherSelection(e.target.value); // Call the handler when teacher is selected
            }}
          >
            <option value="">Select Teacher</option>
            {/* Populate options with teachers from the API */}
            {teachers.map((teacherOption) => (
              <option key={teacherOption.teacherID} value={teacherOption.teacherID}>
                {teacherOption.firstName}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="subject">Subject *</Label>
          <Input
            type="select"
            name="subject"
            id="subject"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            <option value="">Select Subject</option>
            {/* Populate options with subjects from the API */}
            {subjects.map((subjectOption) => (
              <option key={subjectOption.subjectId} value={subjectOption.subjectId}>
                {subjectOption.subjectName}
              </option>
            ))}
          </Input>
        </FormGroup>
        <Button type="submit">Allocate</Button>
      </Form>

      <div className="mt-4">
        <h3>Allocated Subjects</h3>
        <Table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedTeacherSubjects.map((subject, index) => (
              <tr key={index}>
                <td>{subject}</td>
                <td>
                  <Button
                    color="danger"
                    // onClick={() =>
                    //   handleDelete(allocation.allocateSubjectId)
                    // }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllocateSubjects;
