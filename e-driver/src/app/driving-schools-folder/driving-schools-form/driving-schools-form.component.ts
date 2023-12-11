import { drivingSchoolCreationDTO } from './../driving-school.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-driving-schools-form',
  templateUrl: './driving-schools-form.component.html',
  styleUrls: ['./driving-schools-form.component.scss']
})
export class DrivingSchoolsFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder){}

  form: FormGroup;

  @Input()
  model: drivingSchoolCreationDTO;

  @Output()
  onSaveChanges = new EventEmitter<drivingSchoolCreationDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['', {
        validators: [Validators.required]
      }],
      website:['', {
        validators: [Validators.required]
      }]
    })

    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  saveChanges(){
    this.onSaveChanges.emit(this.form.value);
  }

}
