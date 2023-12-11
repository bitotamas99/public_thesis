import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lessonDTO, lessonInstructorDTO } from "./lesson-folder/lesson.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class LessonService {
  
    constructor(private httpclient: HttpClient) { }

    sendLessonReservation(lessonDTO: lessonDTO): Observable<any> {

      const url = `https://localhost:7071/api/driving-lessons/CreateLesson`;

      return this.httpclient.post(url, lessonDTO);
    }
    getReservationLessons(): Observable<lessonInstructorDTO[]> {
      const url = `https://localhost:7071/api/driving-lessons/GetLessonReservations`;
      return this.httpclient.get<lessonInstructorDTO[]>(url);
    }

    acceptReservation(id: number): Observable<any> {
      const url = `https://localhost:7071/api/driving-lessons/Reservations/${id}/accept`;
      return this.httpclient.put(url, null);
    }

    GetAcceptedLessons(id: number): Observable<lessonInstructorDTO[]> {
      const url = `https://localhost:7071/api/driving-lessons/GetAcceptedLessons/${id}`;
      return this.httpclient.get<lessonInstructorDTO[]>(url);
    }

    DeleteLessonReservation(id: number): Observable<any> {
      const url = `https://localhost:7071/api/driving-lessons/${id}/delete`;
      return this.httpclient.delete(url);
    }

    getAcceptedLessonsStudent(id: number): Observable<lessonDTO[]> {
      const url = `https://localhost:7071/api/driving-lessons/GetAcceptedLessonsStudent/${id}`;
      return this.httpclient.get<lessonDTO[]>(url);
    }

    getAcceptedLessonsFromInstructor(id: number): Observable<lessonDTO[]> {
      return this.httpclient.get<lessonDTO[]>(`https://localhost:7071/api/driving-lessons/GetAcceptedLessonsFromInstructor/${id}`);
    }
  }