import { InstructorService } from 'src/app/instructor-folder/instructor.service';
import { instructorDTO } from '../instructor.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { RequestService } from '../../RequestService';
import { studentInstructorRelationshipHelper } from 'src/studentInstructorRelationshipHelper';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent implements OnInit {

  studentInstructorRelationship: studentInstructorRelationshipHelper;

  instructors: instructorDTO[];
  columsToDisplay = ['name', 'carType', 'city', 'request'];
  studentId: number;

  cities = ['Összes', 'Budapest', 'Szeged', 'Győr', 'Debrecen', 'Békéscsaba'];
  selectedCity: string;

  isRequestSent: boolean = false;

  constructor(private instructorService: InstructorService, private requestService: RequestService){
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = parseInt(decodedToken['userId']);
      this.studentId = userId;
    }
  }

  ngOnInit(){
    this.requestService.getAcceptedRequest(this.studentId).subscribe({
      next: (response) => {
        console.log(response);
        this.studentInstructorRelationship = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  this.loadInstructors();
  }

  loadInstructors(){
    this.instructorService.getAll().subscribe(instructors => {
      this.instructors = instructors;
    });
  }

  sendRequest(instructorId: number): void {
    this.requestService.sendRequest(instructorId, this.studentId).subscribe(
      () => {
        console.log('Request sent successfully');
        // update UI or show a success message
        this.isRequestSent = true;

      },
      (error) => {
        console.error(error);
        // show an error message
      }
    );
  }

  onChange(){
    if(this.selectedCity != 'Összes'){
      this.instructorService.getAllWithCity(this.selectedCity).subscribe(instructors => {
        this.instructors = instructors;
      });
    }else{
      this.loadInstructors();
    }
  }
}
