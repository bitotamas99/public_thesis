import { Component, OnInit } from '@angular/core';
import { RatingService } from '../rating.service';
import { RequestService } from '../RequestService';
import jwt_decode from 'jwt-decode';
import { instructorDTO } from '../instructor-folder/instructor.model';
import { studentInstructorRelationshipHelper } from 'src/studentInstructorRelationshipHelper';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rate-instructor',
  templateUrl: './rate-instructor.component.html',
  styleUrls: ['./rate-instructor.component.scss']
})
export class RateInstructorComponent implements OnInit {

  studentId: number;

  studentInstructorRelationship: studentInstructorRelationshipHelper;

  studentVoteRatePrice:number;
  studentVoteRateTone:number;
  studentVoteRateFrequencyOfLessons:number;
  studentVoteRateEducationQuality:number;
  ratingNote = '';

  constructor(private ratingService: RatingService, private requestService: RequestService, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = parseInt(decodedToken['userId']);
      this.studentId = userId;
    }
  }
  ngOnInit(): void {

    this.requestService.getAcceptedRequest(this.studentId).subscribe(
      (response) => {
          console.log(response);
          this.studentInstructorRelationship = response;
      },
      (error) => {
          console.log(error);
      }
  );
  }


  onRatingPrice(ratePrice: number){
    this.studentVoteRatePrice = ratePrice;
  }

  onRatingTone(rateTone: number){
    this.studentVoteRateTone = rateTone;
  }

  onRatingFrequencyOfLessons(rateFrequencyOfLessons: number){
    this.studentVoteRateFrequencyOfLessons = rateFrequencyOfLessons;
  }
  onRatingEducationQuality(rateEducationQuality: number){
    this.studentVoteRateEducationQuality = rateEducationQuality;
  }

  onRatingClick(){
    console.log(this.studentVoteRatePrice);
    console.log(this.studentVoteRateEducationQuality);
    console.log(this.studentVoteRateFrequencyOfLessons);
    console.log(this.studentVoteRateTone);
    console.log(this.ratingNote);

    this.ratingService.rate(this.studentId, this.studentInstructorRelationship.instructorId, this.studentVoteRateEducationQuality, this.studentVoteRateFrequencyOfLessons, this. studentVoteRateTone, this.studentVoteRatePrice, this.ratingNote).subscribe(response =>{
      this.router.navigate(["/home"]);
    });


  }
}
