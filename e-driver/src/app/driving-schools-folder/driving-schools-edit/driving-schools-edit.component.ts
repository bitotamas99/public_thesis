import { DrivingSchoolsService } from './../driving-schools.service';
import { drivingSchoolCreationDTO, drivingSchoolDTO } from './../driving-school.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-driving-schools-edit',
  templateUrl: './driving-schools-edit.component.html',
  styleUrls: ['./driving-schools-edit.component.scss']
})
export class DrivingSchoolsEditComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private drivingSchoolService: DrivingSchoolsService, private router: Router){}

  model: drivingSchoolDTO;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.drivingSchoolService.getById(params['id']).subscribe(drivingschool => {
        this.model = drivingschool;
      })
    });
  }

  saveChanges(drivingSchool: drivingSchoolCreationDTO){
    this.drivingSchoolService.edit(this.model.id, drivingSchool).subscribe(() =>{
        this.router.navigate(["/driving-schools"]);
      });
  }
}
