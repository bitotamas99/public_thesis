import { Observable } from 'rxjs';
import { RatingService } from './../../rating.service';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from 'src/app/instructor-folder/instructor.service';
import { instructorDTO, instructorCreationDTO } from './../instructor.model';
import { Component, OnInit } from '@angular/core';
import { RatingDTO } from 'src/app/rating.model';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.scss']
})
export class InstructorDetailsComponent implements OnInit {

  instructor: instructorDTO;
  name: string;
  city: string;
  carType: string;
  instructorRatings: RatingDTO[];

  constructor(private instructorService: InstructorService, private activatedRoute: ActivatedRoute, private ratingService: RatingService){}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.instructorService.GetByID(params['id']).subscribe((instructor) => {
        this.instructor = instructor;
        this.name = instructor.name;
        this.city = instructor.city;
        this.carType = instructor.carType;

        this.ratingService.GetRecivedRatings(instructor.id).subscribe(ratings => {
          
          this.instructorRatings = ratings;

          console.log(this.instructorRatings);
        });

      });
    });
  }

}
