import { RequestService } from './../RequestService';
import { instructorDTO } from './../instructor-folder/instructor.model';
import { RatingService } from 'src/app/rating.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-recommended-instructors',
  templateUrl: './recommended-instructors.component.html',
  styleUrls: ['./recommended-instructors.component.scss']
})
export class RecommendedInstructorsComponent implements OnInit {

  recommendedInstructors: instructorDTO[];
  columsToDisplay = ['name', 'city', 'carType', 'request'];

  cities = ['Összes', 'Budapest', 'Szeged', 'Győr', 'Debrecen', 'Békéscsaba'];
  selectedCity: string;

  studentId: number;

  isRequestSent: boolean = false;

  constructor(private ratingService: RatingService, private requestService: RequestService, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = parseInt(decodedToken['userId']);
      this.studentId = userId;
    }
  }

  ngOnInit(): void {
    this.ratingService.getRatingRecommendation(this.selectedCity, this.studentId).subscribe(recommendedInstructors => {
      this.recommendedInstructors = recommendedInstructors;
    },
    (error) =>{
      console.error(error);
    });


  }

  sendRequest(instructorId: number): void {
    this.requestService.sendRequest(instructorId, this.studentId).subscribe(
      () => {
        this.isRequestSent = true;
        this.router.navigate(["/home"]);
        console.log('Request sent successfully');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onChange(){
    this.ratingService.getRatingRecommendation(this.selectedCity, this.studentId).subscribe(recommendedInstructors => {
      this.recommendedInstructors = recommendedInstructors;
    },
    (error) =>{
      console.error(error);
    });
  }

}
