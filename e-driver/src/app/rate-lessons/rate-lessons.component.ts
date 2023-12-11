import { RequestService } from './../RequestService';
import { Component, SimpleChanges } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import jwt_decode from 'jwt-decode';
import { InstructorService } from '../instructor-folder/instructor.service';
import { RequestDTO } from '../request.model';
import { RateLessonService } from '../rateOfLessonService';
import { RateOfLesson } from 'src/rateLesson.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rate-lessons',
  templateUrl: './rate-lessons.component.html',
  styleUrls: ['./rate-lessons.component.scss']
})
export class RateLessonsComponent {

  instructorId: number;

  public selectedStudent: string;
  public selectedDate: Date;
  public dates: Date[];
  public requests: RequestDTO[];

  public numberOfLesson: number = 1;

  public dateControl = new FormControl(new Date());

  rateOfLessonNote:string;

  constructor(private requestService: RequestService, private rateOfLessonService: RateLessonService, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = parseInt(decodedToken['userId']);
      this.instructorId = userId;
    }

    this.requestService.GetStudentsRequestsForInstructor(this.instructorId).subscribe(requests => {
      this.requests = requests;
    });
  }

  OnSelectedStudentChange(): void {
    if (this.selectedStudent) {
      this.getLessonDatesByStudent(this.selectedStudent);
    }
  }
  
  getLessonDatesByStudent(studentName: string): void {
    this.requestService.getLessonDatesByStudentName(studentName)
      .subscribe(dates => {
        this.dates = dates; // Assign the dates to the component property
      });
  }

  sendRateOfLesson(){
    const rateLesson: RateOfLesson = {
      studentName: this.selectedStudent,
      text: this.rateOfLessonNote,
      lessonNumber: this.numberOfLesson,
      selectedDate: this.dateControl.value,
      instructorId: this.instructorId
    };

    this.rateOfLessonService.rateOfLesson(rateLesson).subscribe(() => {
      this.router.navigate(["/home"]);
    }, error => {
      console.log('Error occurred while saving rate of lesson:', error);
    });
    
  }

}
