import { RatingService } from './../rating.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-choose-instructor',
  templateUrl: './choose-instructor.component.html',
  styleUrls: ['./choose-instructor.component.scss']
})
export class ChooseInstructorComponent {

  studentVoteRatePrice:number;
  studentVoteRateTone:number;
  studentVoteRateFrequencyOfLessons:number;
  studentVoteRateEducationQuality:number;
  studentId: number;

  constructor(private router: Router, private ratingService: RatingService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = parseInt(decodedToken['userId']);
      this.studentId = userId;
    }
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

  onInstructorRecommendation(){
    this.ratingService.postRatingRecommendation(this.studentVoteRateEducationQuality,  this.studentVoteRateFrequencyOfLessons, this.studentVoteRateTone, this.studentVoteRatePrice, this.studentId).subscribe(response => {
      this.router.navigate(["/recommended-instructors"]);
    });
  }
}

