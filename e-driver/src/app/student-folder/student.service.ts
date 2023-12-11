import { HttpClient } from '@angular/common/http';
import { authenticationResponse, studentCreationDTO, studentDTO } from './student.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { userLoginDTO } from 'src/userLoginDTO';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private tokenKey:string = 'token';
  private expirationTokenKey:string = 'token-expiration';

  constructor(private httpClient: HttpClient, private router: Router) { }

  private BuildFormData(student: studentCreationDTO) : FormData{
    const formData = new FormData();

    formData.append('name', student.name);
    formData.append('username', student.username);
    formData.append('password', student.password);
    formData.append('isInstructor', JSON.stringify(false));

    return formData;
  }

  private BuildLoginFormData(userLoginDTO: userLoginDTO){
    const formData = new FormData();
    
    formData.append('username', userLoginDTO.username);
    formData.append('password', userLoginDTO.password);

    return formData;
  }

  isLogedIn(): boolean{
    const token = localStorage.getItem(this.tokenKey);

    if(!token){
      return false;
    }

    const expiration = localStorage.getItem(this.expirationTokenKey);
    const expirationDate = new Date(2130);

    if(expirationDate <= new Date()){
      return false;
    }

    return true;
  }

  public GetByID(id: number): Observable<studentDTO>{
    return this.httpClient.get<studentDTO>(`https://localhost:7071/api/students/${id}`);
  }

  createStudent(student: studentCreationDTO){
    const formData = this.BuildFormData(student);

    return this.httpClient.post("https://localhost:7071/api/students/Create", formData);
  }


  public login(userLoginDTO: userLoginDTO){
    const formData = this.BuildLoginFormData(userLoginDTO);
    return this.httpClient.post(`https://localhost:7071/api/students/login`, formData);
  }

  saveToken(authenticationResponse: authenticationResponse){
    localStorage.setItem(this.tokenKey, authenticationResponse.token);
    localStorage.setItem(this.expirationTokenKey, authenticationResponse.expiration.toString());
  }

}
