import { InstructorService } from './../instructor-folder/instructor.service';
import { userLoginDTO } from './../../userLoginDTO';
import { StudentService } from './../student-folder/student.service';
import { studentCreationDTO, studentDTO } from './../student-folder/student.model';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  selectedOption: string = 'Oktató';

  form: FormGroup;

  hide: boolean = true;

  errorMessage: string[];

  constructor(private router: Router, private formBuilder: FormBuilder, private studentService: StudentService, private instructorService: InstructorService){
  }


  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
  }

  login(userDTO: userLoginDTO){
    if (this.selectedOption == 'Tanuló') {
      this.studentService.login(userDTO).subscribe({ 
        next:(response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.error;
        }
    });
    }
    else
    {
      this.instructorService.login(userDTO).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.error;
        }
    });
    }
}
  

}
