import { DrivingSchoolsService } from './../driving-schools.service';
import { drivingSchoolCreationDTO } from './../driving-school.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driving-schools-create',
  templateUrl: './driving-schools-create.component.html',
  styleUrls: ['./driving-schools-create.component.scss']
})
export class DrivingSchoolsCreateComponent implements OnInit {

  constructor(private router: Router, private drivingSchoolService: DrivingSchoolsService){}

  ngOnInit(): void {
    
  }


  saveChanges(drivingSchoolCreationDTO: drivingSchoolCreationDTO){
    this.drivingSchoolService.create(drivingSchoolCreationDTO).subscribe(() =>{
      this.router.navigate(["/driving-schools"]);
    }, error => console.error(error));

    
  }
}
