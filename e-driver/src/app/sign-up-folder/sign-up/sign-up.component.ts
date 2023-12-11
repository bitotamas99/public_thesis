import { RatingService } from './../../rating.service';
import { StudentService } from './../../student-folder/student.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { instructorCreationDTO } from './../../instructor-folder/instructor.model';
import { studentCreationDTO } from '../../student-folder/student.model';
import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/app/instructor-folder/instructor.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private instructorService: InstructorService, private  studentService:StudentService, private router: Router){}

  isStudentFormVisible: boolean;



  ngOnInit(): void {

  }

  onStudentSelected(){
    this.isStudentFormVisible = true;
  }

  onInstructorSelected(){
    this.isStudentFormVisible = false;
  }
  onInstructorSignUp(instructor: instructorCreationDTO){
    this.instructorService.Create(instructor).subscribe(() => {
      this.router.navigate(['/login']);
    });
    
    console.log(instructor);
  }
  
  onStudentSignUp(student: studentCreationDTO){
    this.studentService.createStudent(student).subscribe((response: any) =>{
      this.router.navigate(['/login']);
    }, error => console.error(error));
  }

}
