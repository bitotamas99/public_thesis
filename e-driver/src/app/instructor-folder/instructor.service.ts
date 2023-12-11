import { userLoginDTO } from 'src/userLoginDTO';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { instructorPostGetDTO, instructorCreationDTO, instructorDTO } from './instructor.model';
import { drivingSchoolDTO } from '../driving-schools-folder/driving-school.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private httpClient: HttpClient) { }
  //https://localhost:7071/api/instructors

  public PostGet(): Observable<instructorPostGetDTO>{
    return this.httpClient.get<instructorPostGetDTO>(`https://localhost:7071/api/instructors/PostGet`);
  }

  public Create(instructorCreationDTO: instructorCreationDTO){
    const formData = this.BuildFormData(instructorCreationDTO);

    return this.httpClient.post(`https://localhost:7071/api/instructors/Create`, formData);
  }

  private BuildFormData(instructor: instructorCreationDTO) : FormData{
    const formData = new FormData();

    formData.append('name', instructor.name);
    formData.append('username', instructor.username);
    formData.append('password', instructor.password);
    formData.append('city', instructor.city);
    formData.append('carType', instructor.carType);
    formData.append('drivingSchoolIds', JSON.stringify(instructor.drivingSchoolIds));

    return formData;
  }

  private BuildLoginFormData(userLoginDTO: userLoginDTO){
    const formData = new FormData();
    
    formData.append('username', userLoginDTO.username);
    formData.append('password', userLoginDTO.password);

    return formData;
  }

  public GetByID(id: number): Observable<instructorDTO>{
    return this.httpClient.get<instructorDTO>(`https://localhost:7071/api/instructors/${id}`);
  }
  public getAll(): Observable<instructorDTO[]>{
    return this.httpClient.get<instructorDTO[]>("https://localhost:7071/api/instructors");
  }

  public login(userLoginDTO: userLoginDTO){
    const formData = this.BuildLoginFormData(userLoginDTO);
    return this.httpClient.post(`https://localhost:7071/api/instructors/login`, formData);
  }

  public getAllWithCity(city: string): Observable<instructorDTO[]>{
    return this.httpClient.get<instructorDTO[]>(`https://localhost:7071/api/instructors/${city}`);
  }

  getInstructorDrivingSchools(id: number): Observable<drivingSchoolDTO[]> {
    const url = `https://localhost:7071/api/instructors/GetDrivingSchools/${id}`;
    return this.httpClient.get<drivingSchoolDTO[]>(url);
  }

}
