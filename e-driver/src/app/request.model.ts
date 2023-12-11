import { instructorDTO } from "./instructor-folder/instructor.model";
import { studentDTO } from "./student-folder/student.model";

export interface RequestCreationDTO {
    studentId: number;
    instructorId: number;
}

export interface RequestDTO {
    id: number;
    studentId: number;
    instructorId: number;
    accepted: boolean;
    requestDate: Date;
    studentName: string;
  }