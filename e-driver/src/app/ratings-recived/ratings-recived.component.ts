import { RatingService } from 'src/app/rating.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Rating } from '../rating.model';

@Component({
  selector: 'app-ratings-recived',
  templateUrl: './ratings-recived.component.html',
  styleUrls: ['./ratings-recived.component.scss']
})
export class RatingsRecivedComponent implements OnInit {

instructorId: number;

columsToDisplay = ['studentName', 'price', 'tone', 'rateEducationQuality', 'rateFrequencyOfLessons', 'text'];

ratings: Rating[];

  constructor(private ratingsService: RatingService) {

  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = parseInt(decodedToken['userId']);
      this.instructorId = userId;
    }


    this.ratingsService.GetRecivedRatings(this.instructorId).subscribe(ratings => {
      this.ratings = ratings;
      console.log("----------");
      console.log(ratings);
    })
  }

}
