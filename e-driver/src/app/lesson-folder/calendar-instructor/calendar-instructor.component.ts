import { Component, OnInit } from '@angular/core';
import { lessonDTO, lessonInstructorDTO } from '../lesson.model';
import { LessonService } from 'src/app/lesson.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-calendar-instructor',
  templateUrl: './calendar-instructor.component.html',
  styleUrls: ['./calendar-instructor.component.scss']
})
export class CalendarInstructorComponent implements OnInit {

  lessons: lessonInstructorDTO[];
  instructorId: number;

  acceptedLessons: lessonInstructorDTO[];

  columsToDisplay = ['student', 'startDate', 'endDate','state'];

  columsToDisplayAccepted = ['student', 'startDate', 'endDate'];


  constructor(private lessonService: LessonService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = parseInt(decodedToken['userId']);
      this.instructorId = userId;
    }
  }

  ngOnInit(): void {
    this.lessonService.getReservationLessons().subscribe(lessons =>{
      this.lessons = lessons;
    });

    this.lessonService.GetAcceptedLessons(this.instructorId).subscribe(acceptedLessons => {
      this.acceptedLessons = acceptedLessons;
    });
  }

  acceptRequest(id: number) {
    this.lessonService.acceptReservation(id).subscribe(lessons => {
      console.log('Reservation accepted successfully');
      this.lessons = lessons;
    });

    this.lessonService.getReservationLessons().subscribe(lessons =>{
      this.lessons = lessons;
    });

    this.lessonService.GetAcceptedLessons(this.instructorId).subscribe(acceptedLessons => {
      this.acceptedLessons = acceptedLessons;
    });
  }

  deleteRequest(id: number) {
    this.lessonService.DeleteLessonReservation(id).subscribe(lessons => {
      this.lessons = lessons;
    });
  }
}
