import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RateOfLesson } from 'src/rateLesson.model';

@Injectable({
  providedIn: 'root'
})
export class RateLessonService {

  constructor(private http: HttpClient) { }

  rateOfLesson(rateLesson: RateOfLesson): Observable<any> {
    const url = `https://localhost:7071/api/instructors/RateOfLessons`;
    return this.http.post(url, rateLesson);
  }


  getAllRateOfLessons(studentId: number): Observable<RateOfLesson[]> {
    const url = `https://localhost:7071/api/students/${studentId}/GetAllRateOfLessons`;
    return this.http.get<RateOfLesson[]>(url);
  }
}