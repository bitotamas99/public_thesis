import { StudentService } from './../student-folder/student.service';
import { BehaviorSubject } from 'rxjs';
import { LoginComponent } from './../login/login.component';
import { Component, Output } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { RequestService } from '../RequestService';
import { studentInstructorRelationshipHelper } from 'src/studentInstructorRelationshipHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isLoggedIn: boolean = false;
  isInstructor: boolean = false;
  isAdmin: boolean = false;
  userId: number;
  requestNumber: number = 0;

  studentInstructorRelationship: studentInstructorRelationshipHelper;

  constructor(public studentService: StudentService, private router:Router, private requestService: RequestService){
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const role = decodedToken['role'];
      const userId = parseInt(decodedToken['userId']);
      this.userId = userId;
      this.isInstructor = (role === 'instructor');
      
      this.isAdmin = (role === 'admin')
    }
    
  }

  ngOnInit(): void {
    console.log(this.isLoggedIn);

    this.requestService.getRequestsForInstructor(this.userId).subscribe( requests => {
      this.requestNumber = requests.length;
      this.requestService.setRequestCount(this.requestNumber);
    });

    this.requestService.getAcceptedRequest(this.userId).subscribe({
      next: (response) => {
        console.log(response);
        this.studentInstructorRelationship = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
    
    this.requestService.requestCount$.subscribe(count => {
      this.requestNumber = count;
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
    
}
