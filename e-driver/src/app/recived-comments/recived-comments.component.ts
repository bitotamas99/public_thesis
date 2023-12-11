import { Component, OnInit } from '@angular/core';
import { RateLessonService } from '../rateOfLessonService';
import jwt_decode from 'jwt-decode';
import { RateOfLesson } from 'src/rateLesson.model';

@Component({
  selector: 'app-recived-comments',
  templateUrl: './recived-comments.component.html',
  styleUrls: ['./recived-comments.component.scss']
})
export class RecivedCommentsComponent implements OnInit {

  studentId: number;
  rateOfLessons: RateOfLesson[];

  columsToDisplay = ['Date', 'Text', 'NumberOfLesson'];

  constructor(private rateOfLessonsService: RateLessonService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = parseInt(decodedToken['userId']);
      this.studentId = userId;
    }


  }


  ngOnInit(): void {
    this.rateOfLessonsService.getAllRateOfLessons(this.studentId).subscribe(rateOfLesson => {
      this.rateOfLessons = rateOfLesson;

      console.log(this.rateOfLessons);
    });
  }
}
