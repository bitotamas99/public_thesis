import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestCreationDTO, RequestDTO } from './request.model';
import { instructorDTO } from './instructor-folder/instructor.model';
import { studentInstructorRelationshipHelper } from 'src/studentInstructorRelationshipHelper';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = 'https://localhost:7071/api/students/SendRequest';

  constructor(private http: HttpClient) { }

  private requestCountSource = new BehaviorSubject<number>(0);
  requestCount$ = this.requestCountSource.asObservable();

  setRequestCount(count: number) {
    this.requestCountSource.next(count);
  }

  deleteRequest(id: number): Observable<any> {
    const url = `https://localhost:7071/api/instructors/requests/${id}/delete`;
    return this.http.delete<any>(url);
  }

  sendRequest(instructorId: number, studentId: number): Observable<any> {
    const request: RequestCreationDTO = {
      instructorId,
      studentId
    };
    console.log(instructorId, studentId);
    return this.http.post<any>(this.apiUrl, request);
  }

  getRequestsForInstructor(instructorId: number): Observable<RequestDTO[]> {
    const url = `https://localhost:7071/api/instructors/${instructorId}/Requests`;
    return this.http.get<RequestDTO[]>(url);
  }

  GetStudentsRequestsForInstructor(instructorId: number): Observable<RequestDTO[]> {
    const url = `https://localhost:7071/api/instructors/${instructorId}/StudentRequests`;
    return this.http.get<RequestDTO[]>(url);
  }

  getLessonDatesByStudentName(studentName: string): Observable<Date[]> {
    const url = `https://localhost:7071/api/instructors/GetDatesToRateLesson?studentName=${studentName}`;
    return this.http.get<Date[]>(url);
  }

  acceptRequest(requestId: number): Observable<any> {
    const url = `https://localhost:7071/api/instructors/requests/${requestId}/accept`;
    return this.http.put(url, {});
  }

  public getAcceptedRequest(studentId: number): Observable<studentInstructorRelationshipHelper> {
    const url = `https://localhost:7071/api/students/${studentId}/GetAcceptedRequest`;
    return this.http.get<studentInstructorRelationshipHelper>(url);
  }


}