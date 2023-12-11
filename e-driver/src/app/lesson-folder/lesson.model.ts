export interface lessonDTO{
    studentId: number;
    instructorId: number;
    start:  Date | null;
    end:  Date | null;
}

export interface lessonInstructorDTO{
    studentId: number;
    studentName: string;
    instructorId: number;
    start:  Date | null;
    end:  Date | null;
}