import { studentCreationDTO } from './../student.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RatingService } from 'src/app/rating.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  studentForm: FormGroup;

  @Input()
  model: studentCreationDTO;

  @Output()
  onSaveChanges = new EventEmitter<studentCreationDTO>();

  hide = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private ratingService: RatingService){}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      isInstructor: false
    })

    if(this.model !== undefined){
      this.studentForm.patchValue(this.model);
    }
  }



  studentRegistration(){
    this.onSaveChanges.emit(this.studentForm.value);
  }

}
