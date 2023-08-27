import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Form, Button, Table } from "reactstrap";
import api from "../../api";
import { Teacher } from "../../interfaces/teacherInterface";
import { Subject } from "../../interfaces/subjectInterface";
import { Allocation } from "../../interfaces/subjectallocateinterface";

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
    setTeacherId(selectedTeacherId);
    fetchAllocatedSubjectsForTeacher(selectedTeacherId); // Fetch allocated subjects for the selected teacher
  };

  // Function to fetch allocated subjects for the selected teacher
  const fetchAllocatedSubjectsForTeacher = async (teacherId: string) => {
    try {
      const response = await api.get(`/api/AllocateSubject/teacher/${teacherId}`);
      setSelectedTeacherSubjects(response.data.map((subject: any) => subject.subjectName));
    } catch (error) {
      console.error("Error fetching teacher's subjects:", error);
    }
  };

  // Function to get the subject name from subjectId
  const getSubjectNameById = (subjectId: string) => {
    const subject = subjects.find((subject) => subject.subjectId === Number(subjectId));
    return subject ? subject.subjectName : "";
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if both teacherId and subjectId are selected
    if (teacherId && subjectId) {
      try {
        // Allocate subject to teacher
        const newAllocation: Allocation = {
          allocateSubjectId: Date.now(), 
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

        // Refresh the table with the updated list of allocated subjects
        fetchAllocatedSubjectsForTeacher(teacherId);

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
const handleDelete = async (allocateSubjectId: number) => {
  try {
    // Make an API call to delete the allocation
    await api.delete(`/api/AllocateSubject/${allocateSubjectId}`);

    // Update the allocatedSubjects state after deletion
    const updatedAllocations = allocatedSubjects.filter(
      (allocation) => allocation.allocateSubjectId !== allocateSubjectId
    );
    setAllocatedSubjects(updatedAllocations);
  } catch (error) {
    console.error("Error deleting allocation:", error);
  }
};

  return (
    <div style={{ paddingTop:40, paddingBottom:40 }}>
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
            
            {subjects.map((subjectOption) => (
              <option key={subjectOption.subjectId} value={subjectOption.subjectId}>
                {subjectOption.subjectName}
              </option>
            ))}
          </Input>
        </FormGroup>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button type="submit" color="primary" style={{ marginBottom: "8px" }}>
            Allocate Subject
          </Button>
        </div>
      </Form>

      <div className="mt-4">
        <h3>Allocated Subjects</h3>
        <Table striped>
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
                    onClick={() => handleDelete(allocatedSubjects[index]?.allocateSubjectId)}
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
