import { lessonDTO } from './../lesson.model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RequestService } from 'src/app/RequestService';
import { studentInstructorRelationshipHelper } from 'src/studentInstructorRelationshipHelper';
import jwt_decode from 'jwt-decode';
import { LessonService } from 'src/app/lesson.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-student',
  templateUrl: './calendar-student.component.html',
  styleUrls: ['./calendar-student.component.scss']
})
export class CalendarStudentComponent implements OnInit {

  studentId: number;
  studentInstructorRelationshipHelper: studentInstructorRelationshipHelper;

  acceptedLessons: lessonDTO[];
  occupiedLessons: lessonDTO[];
  columsToDisplayForStudent = ['startDate', 'endDate'];

  errorMessage: string[];

  public startDateControl = new FormControl(new Date());
  public endDateControl = new FormControl(new Date());

constructor(private requestService: RequestService, private lessonService: LessonService, private router: Router) {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwt_decode(token);
    const userId = parseInt(decodedToken['userId']);
    this.studentId = userId;
  }
}

  ngOnInit(): void {
    this.requestService.getAcceptedRequest(this.studentId).subscribe(acceptedRequest => {
      this.studentInstructorRelationshipHelper = acceptedRequest;
    });

    this.lessonService.getAcceptedLessonsStudent(this.studentId).subscribe(
      lessons => {
        this.acceptedLessons = lessons;
      });

      this.lessonService.getAcceptedLessonsFromInstructor(this.studentId)
      .subscribe(lessons => {
        this.occupiedLessons = lessons;
      });
  }

  onLessonReservation(){
    const startDateValue = this.startDateControl.value;
    const endDateValue = this.endDateControl.value;

    if (startDateValue && endDateValue) {
      const startDate = new Date(startDateValue);
      startDate.setHours(startDate.getHours() + 2);

      const endDate = new Date(endDateValue);
      endDate.setHours(endDate.getHours() + 2);

      const lessonDTO: lessonDTO = {
        studentId: this.studentId,
        instructorId: this.studentInstructorRelationshipHelper.instructorId,
        start: startDate,
        end: endDate
      };

      this.lessonService.sendLessonReservation(lessonDTO).subscribe(() => {
        console.log('lesson saved successfully');
        this.router.navigate(["/home"]);
      }, error => {
        this.errorMessage = error.error;
        console.log('Error occurred while lesson reservating:', error);
      });
    }
  }
}
