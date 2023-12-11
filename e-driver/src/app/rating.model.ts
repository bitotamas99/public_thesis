export interface RatingDTO{
    ratePrice: number;
    rateEducationQuality: number;
    rateFrequencyOfLessons: number;
    rateTonee: number;
    rateText: string;
    instructorId: number;
    studentId: number;
}

export interface Rating{
    ratePrice: number;
    rateEducationQuality: number;
    rateFrequencyOfLessons: number;
    rateTonee: number;
    rateText: string;
    instructorId: number;
    studentId: number;
    studentName: string;
}