import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Form, Button, Table } from "reactstrap";
import api from "../../api";

// Interface for the allocation object
interface AllocateClassroom {
  allocateClassroomId: number;
  teacherId: number;
  classroomId: number;
}

interface Teacher {
  teacherID: number;
  firstName: string;
  lastName: string;
  contactNo: string;
  emailAddress: string;
  allocatedSubjects: any[];
  allocateClassrooms: any[];
}

interface Classroom {
  classroomId: number;
  classroomName: string;
}

const AllocateClassrooms: React.FC = () => {
  // State variables to store allocation details
  const [teacherId, setTeacherId] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [allocatedClassrooms, setAllocatedClassrooms] = useState<AllocateClassroom[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [selectedTeacherClassrooms, setSelectedTeacherClassrooms] = useState<string[]>([]);

  // Function to fetch teachers and classrooms from APIs
  useEffect(() => {
    fetchTeachers();
    fetchClassrooms();
  }, []);

  const fetchTeachers = async () => {
    try {
      // Fetch teachers from the API and set them in the state
      const response = await api.get("/api/teacher");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchClassrooms = async () => {
    try {
      // Fetch classrooms from the API and set them in the state
      const response = await api.get("/api/classrooms");
      setClassrooms(response.data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  // Function to handle teacher selection from the drop-down
  const handleTeacherSelection = async (selectedTeacherId: string) => {
    setTeacherId(selectedTeacherId);
    fetchAllocatedClassroomsForTeacher(selectedTeacherId);
  };

  // Function to fetch allocated classrooms for the selected teacher
  const fetchAllocatedClassroomsForTeacher = async (teacherId: string) => {
    try {
      const response = await api.get(`/api/AllocateClassroom/teacher/${teacherId}`);
      setSelectedTeacherClassrooms(response.data.map((classroom: any) => classroom.classroomName));
    } catch (error) {
      console.error("Error fetching teacher's classrooms:", error);
    }
  };

  // Function to get the classroom name from classroomId
  const getClassroomNameById = (classroomId: string) => {
    const classroom = classrooms.find((classroom) => classroom.classroomId === Number(classroomId));
    return classroom ? classroom.classroomName : "";
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if both teacherId and classroomId are selected
    if (teacherId && classroomId) {
      try {
        // Allocate classroom to teacher
        const newAllocation: AllocateClassroom = {
          allocateClassroomId: Date.now(), 
          teacherId: Number(teacherId),
          classroomId: Number(classroomId),
        };

        // Make an API call to save the allocation
        await api.post("/api/AllocateClassroom", {
            teacherId: Number(newAllocation.teacherId),
            classroomId: Number(newAllocation.classroomId),
          });

        // Update the allocatedClassrooms state with the new allocation
        setAllocatedClassrooms([...allocatedClassrooms, newAllocation]);

        // Refresh the table with the updated list of allocated classrooms
        fetchAllocatedClassroomsForTeacher(teacherId);

        setTeacherId("");
        setClassroomId("");
      } catch (error) {
        console.error("Error allocating classroom:", error);
      }
    } else {
      // Display an error message if both teacher and classroom are not selected
      alert("Please select both teacher and classroom to allocate.");
    }
  };

  // Function to handle classroom allocation deletion
  const handleDelete = async (allocateClassroomId: number) => {
    try {
      // Make an API call to delete the allocation
      await api.delete(`/api/AllocateClassroom/${allocateClassroomId}`);

      // Update the allocatedClassrooms state after deletion
      const updatedAllocations = allocatedClassrooms.filter(
        (allocation) => allocation.allocateClassroomId !== allocateClassroomId
      );
      setAllocatedClassrooms(updatedAllocations);
    } catch (error) {
      console.error("Error deleting allocation:", error);
    }
  };

  return (
    <div>
      <h2>Allocate Classrooms</h2>
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
              handleTeacherSelection(e.target.value);
            }}
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacherOption) => (
              <option key={teacherOption.teacherID} value={teacherOption.teacherID}>
                {teacherOption.firstName}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="classroom">Classroom *</Label>
          <Input
            type="select"
            name="classroom"
            id="classroom"
            value={classroomId}
            onChange={(e) => setClassroomId(e.target.value)}
          >
            <option value="">Select Classroom</option>
            {classrooms.map((classroomOption) => (
              <option key={classroomOption.classroomId} value={classroomOption.classroomId}>
                {classroomOption.classroomName}
              </option>
            ))}
          </Input>
        </FormGroup>
        <Button type="submit">Allocate</Button>
      </Form>

      <div className="mt-4">
        <h3>Allocated Classrooms</h3>
        <Table>
          <thead>
            <tr>
              <th>Classroom</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedTeacherClassrooms.map((classroom, index) => (
              <tr key={index}>
                <td>{classroom}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => handleDelete(allocatedClassrooms[index]?.allocateClassroomId)}
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

export default AllocateClassrooms;
