import { drivingSchoolDTO } from './../driving-school.model';
import { DrivingSchoolsService } from './../driving-schools.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-driving-schools',
  templateUrl: './driving-schools.component.html',
  styleUrls: ['./driving-schools.component.scss']
})
export class DrivingSchoolsComponent implements OnInit {

  drivingSchools: drivingSchoolDTO[];
  columsToDisplay = ['name', 'website'];

  isAdmin: boolean;

  constructor(private drivingSchoolService: DrivingSchoolsService)
  {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const role = decodedToken['role'];
      this.isAdmin = (role === 'admin')
    }
  }

  ngOnInit(): void {
    this.loadDrivingSchools();
  }

  loadDrivingSchools(){
    this.drivingSchoolService.getAll().subscribe(drivingSchools => {
      this.drivingSchools = drivingSchools;
    });
  }

  delete(id: number){
    this.drivingSchoolService.delete(id).subscribe(() =>{
      this.loadDrivingSchools();
    });
  }

}
