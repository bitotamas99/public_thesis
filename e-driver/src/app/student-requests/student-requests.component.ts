import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { RequestService } from '../RequestService';
import { RequestDTO } from '../request.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-requests',
  templateUrl: './student-requests.component.html',
  styleUrls: ['./student-requests.component.scss']
})
export class StudentRequestsComponent implements OnInit {

  instructorId: number;

  requests: RequestDTO[];

  columsToDisplay = ['date', 'student', 'state'];

  constructor(private requestService: RequestService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = parseInt(decodedToken['userId']);
      this.instructorId = userId;
    }
  }

  ngOnInit(): void {
    this.requestService.getRequestsForInstructor(this.instructorId).subscribe(requests => {
      this.requests = requests;
    });
  }

  acceptRequest(requestId: number) {
    this.requestService.acceptRequest(requestId).subscribe(requests => {
      this.requests = requests;
    });
  }

  deleteRequest(requestId: number) {
    this.requestService.deleteRequest(requestId).subscribe(requests => {
      this.requests = requests;
    });

    this.requestService.GetStudentsRequestsForInstructor(this.instructorId).subscribe(requests => {
      this.requests = requests;
    });
  }
}
