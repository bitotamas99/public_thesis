import { instructorDTO } from './instructor-folder/instructor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating, RatingDTO } from './rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private httpclient: HttpClient) { }


  public rate(studentId: number, instructorId: number, ratingEducationQuality: number, ratingFrequencyOfLessons: number, ratingTone: number, ratingPrice: number, ratingText: string){
    const ratingDTO = {
        studentId: studentId,
        instructorId: instructorId,
        rateEducationQuality: ratingEducationQuality,
        rateFrequencyOfLessons: ratingFrequencyOfLessons,
        rateTone: ratingTone,
        ratePrice: ratingPrice,
        rateText: ratingText
    };
    return this.httpclient.post(`https://localhost:7071/api/ratings`, ratingDTO);
  }

  public postRatingRecommendation(ratingEducationQuality: number, ratingFrequencyOfLessons: number, ratingTone: number, ratingPrice: number, studentId: number){
    const ratingRecommendationDTO = {
        rateEducationQuality: ratingEducationQuality,
        rateFrequencyOfLessons: ratingFrequencyOfLessons,
        rateTone: ratingTone,
        ratePrice: ratingPrice,
        studentId: studentId
    };

    return this.httpclient.post(`https://localhost:7071/api/ratings/RatingRecommendation`, ratingRecommendationDTO);
  }

  public getRatingRecommendation(city: string, id: number): Observable<instructorDTO[]> {
    return this.httpclient.get<instructorDTO[]>(`https://localhost:7071/api/ratings/Recommendation/${city}/${id}`);
  }

  public GetRecivedRatings(instructorId: number): Observable<Rating[]> {
    const url = `https://localhost:7071/api/ratings/${instructorId}/RecivedRatings`;
    return this.httpclient.get<Rating[]>(url);
  }

}
