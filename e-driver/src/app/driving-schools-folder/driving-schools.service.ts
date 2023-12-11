import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { drivingSchoolCreationDTO, drivingSchoolDTO } from './driving-school.model';

@Injectable({
  providedIn: 'root'
})
export class DrivingSchoolsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<drivingSchoolDTO[]>{
    return this.httpClient.get<drivingSchoolDTO[]>("https://localhost:7071/api/driving-schools");
  }

  getById(Id: number): Observable<drivingSchoolDTO>{
    return this.httpClient.get<drivingSchoolDTO>(`https://localhost:7071/api/driving-schools/${Id}`);
  }

  create(drivingSchool: drivingSchoolCreationDTO){
    return this.httpClient.post("https://localhost:7071/api/driving-schools", drivingSchool);
  }

  edit(Id: number, drivingSchool: drivingSchoolCreationDTO){
    return this.httpClient.put(`https://localhost:7071/api/driving-schools/${Id}`, drivingSchool);
  }

  delete(Id: number){
    return this.httpClient.delete(`https://localhost:7071/api/driving-schools/${Id}`);
  }
}
