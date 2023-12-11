import { InstructorService } from '../instructor.service';
import { HttpClient } from '@angular/common/http';
import { instructorCreationDTO } from '../instructor.model';
import * as core from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { drivingSchoolDTO } from 'src/app/driving-schools-folder/driving-school.model';
import { MatSelectChange } from '@angular/material/select';

@core.Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.scss']
})
export class InstructorFormComponent implements core.OnInit {

  instructorForm: FormGroup;

  @core.Input()
  model: instructorCreationDTO[];

  @core.Output()
  onSaveChanges = new core.EventEmitter<instructorCreationDTO>();

  hide = true;

  SelectedItems: Number[] = [];

  drivingSchoolList: any[] = [];
  

  constructor(private router: Router, private formBuilder: FormBuilder, private instructorService: InstructorService){}

  ngOnInit(): void {
    this.instructorService.PostGet().subscribe(response =>{
      this.drivingSchoolList = response.drivingSchools.map(drivingSchool => {
        return drivingSchool; 
      })
    });

    this.instructorForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required],
      city: ['', Validators.required],
      carType: ['', Validators.required],
      drivingSchoolIds: '' 
    });

    if(this.model !== undefined){
      this.instructorForm.patchValue(this.model);
    }
  }

  instructorRegistration() {
    if (this.instructorForm.valid) {
      const drivingSchoolIds = this.SelectedItems.map(value => value);
      this.instructorForm.get('drivingSchoolIds')?.setValue(drivingSchoolIds);
  
      this.onSaveChanges.emit(this.instructorForm.value);
      console.log(this.instructorForm.value);
    }
  }

  onSelectedItemsChange(event: MatSelectChange) {
    this.SelectedItems = event.value;
  }
}
