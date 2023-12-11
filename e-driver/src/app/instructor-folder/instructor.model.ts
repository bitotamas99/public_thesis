import { drivingSchoolDTO } from "../driving-schools-folder/driving-school.model";
import { RatingDTO } from "../rating.model";

export interface instructorCreationDTO{
    name: string;
    username: string;
    password: string;
    city: string;
    carType: string;
    drivingSchoolIds: number[];
}

export interface instructorDTO{
    id: number;
    name: string;
    username: string;
    password: string;
    city: string;
    carType: string;
    drivingSchools: drivingSchoolDTO[];
    studentVoteRatePrice:number;
    studentVoteRateTone:number;
    studentVoteRateFrequencyOfLessons:number;
    studentVoteRateEducationQuality:number;
    studentVoteRateText: string;
    ratings: RatingDTO[];
}

export interface instructorPostGetDTO{
    drivingSchools: drivingSchoolDTO[];
}