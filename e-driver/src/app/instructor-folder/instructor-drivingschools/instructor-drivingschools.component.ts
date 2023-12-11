import { drivingSchoolDTO } from './../../driving-schools-folder/driving-school.model';
import { Component, OnInit } from '@angular/core';
import { DrivingSchoolsService } from 'src/app/driving-schools-folder/driving-schools.service';
import { InstructorService } from '../instructor.service';
import jwt_decode from 'jwt-decode';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-instructor-drivingschools',
  templateUrl: './instructor-drivingschools.component.html',
  styleUrls: ['./instructor-drivingschools.component.scss']
})
export class InstructorDrivingschoolsComponent implements OnInit {

  instructorId: number;
  //all the drivingschools
  drivingSchoolList: any[] = [];

  //instructor's current drivingschools
  instructorDrivingSchools: any[] = [];

  //to get the selected drivingschool's ids
  drivingSchoolIds: number[] = [];

  //updated schools
  updatedDrivingSchoolIds: number[] = [];

constructor(private drivingSchoolService: DrivingSchoolsService, private instructorService: InstructorService) {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwt_decode(token);
    const userId = parseInt(decodedToken['userId']);
    this.instructorId = userId;
  }
}

  ngOnInit(): void {
    this.drivingSchoolService.getAll().subscribe(drivingSchools => {
      this.drivingSchoolList = drivingSchools;
      console.log(this.drivingSchoolList);
    });

    this.instructorService.getInstructorDrivingSchools(this.instructorId).subscribe(drivingSchools => {
      this.instructorDrivingSchools = drivingSchools;
      console.log(this.instructorDrivingSchools);
    });
  }
  
  onSelectedItemsChange(event: MatSelectChange) {
    this.updatedDrivingSchoolIds = event.value;
    console.log(this.updatedDrivingSchoolIds);

  }

  OnDrivingSchoolsUpdate(){
    
  }

}
