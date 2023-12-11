import { Component, OnInit } from '@angular/core';
import { RequestService } from '../RequestService';
import jwt_decode from 'jwt-decode';
import { RequestDTO } from '../request.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  instructorId: number;
  requests: RequestDTO[];
  columsToDisplay = ['student', 'deleteRelationship'];

  constructor(private requestService: RequestService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = parseInt(decodedToken['userId']);
      this.instructorId = userId;
    }
  }

  ngOnInit(): void {
    this.requestService.GetStudentsRequestsForInstructor(this.instructorId).subscribe(requests => {
      this.requests = requests;
    });
  }

  deleteRequest(requestId: number) {
    this.requestService.deleteRequest(requestId).subscribe(requests => {
      this.requests = requests;

      this.requestService.GetStudentsRequestsForInstructor(this.instructorId).subscribe(requests => {
        this.requests = requests;
      });
  });
  }

}
