import { studentDTO } from './../student-folder/student.model';
import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { studentCreationDTO} from '../student-folder/student.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  form: FormGroup;


  @Output()
  onSubmit = new EventEmitter<studentDTO>();

  hide = true;

  constructor(private router: Router, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    this.onSubmit.emit(this.form.value);
  }

}
