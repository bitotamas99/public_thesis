import { RecommendedInstructorsComponent } from './recommended-instructors/recommended-instructors.component';
import { HomeComponent } from './home/home.component';
import { StudentRequestsComponent } from './student-requests/student-requests.component';
import { ChooseInstructorComponent } from './choose-instructor/choose-instructor.component';
import { DrivingSchoolsComponent } from './driving-schools-folder/driving-schools/driving-schools.component';
import { DrivingSchoolsEditComponent } from './driving-schools-folder/driving-schools-edit/driving-schools-edit.component';
import { DrivingSchoolsCreateComponent } from './driving-schools-folder/driving-schools-create/driving-schools-create.component';
import { RatingsRecivedComponent } from './ratings-recived/ratings-recived.component';
import { RateLessonsComponent } from './rate-lessons/rate-lessons.component';
import { InstructorsComponent } from './instructor-folder/instructor-list/instructors.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up-folder/sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorDetailsComponent } from './instructor-folder/instructor-details/instructor-details.component';
import { StudentListComponent } from './student-list/student-list.component';
import { RecivedCommentsComponent } from './recived-comments/recived-comments.component';
import { RateInstructorComponent } from './rate-instructor/rate-instructor.component';
import { InstructorDrivingschoolsComponent } from './instructor-folder/instructor-drivingschools/instructor-drivingschools.component';
import { CalendarInstructorComponent } from './lesson-folder/calendar-instructor/calendar-instructor.component';
import {CalendarStudentComponent} from './lesson-folder/calendar-student/calendar-student.component';

const routes: Routes = [
  { 
    path: '', component: LoginComponent
  },
  { 
    path: 'home', component: HomeComponent
  },
  { 
    path: 'choose-instructor', component: ChooseInstructorComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'instructors', component: InstructorsComponent
  },
  {
    path: 'rate-lessons', component: RateLessonsComponent
  },
  {
    path: 'rate-instructor', component: RateInstructorComponent
  },
  {
    path: 'ratings-recived', component: RatingsRecivedComponent
  },
  {
    path: 'recived-comments', component: RecivedCommentsComponent
  },
  {
    path: 'driving-schools', component: DrivingSchoolsComponent
  },
  {
    path: 'driving-schools-create', component: DrivingSchoolsCreateComponent
  },
  {
    path: 'driving-schools-edit/:id', component: DrivingSchoolsEditComponent
  },
  {
    path: 'instructor-drivingschools', component: InstructorDrivingschoolsComponent
  },
  {
    path: 'student-requests', component: StudentRequestsComponent
  },
  {
    path: 'student-list', component: StudentListComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'instructor/:id', component: InstructorDetailsComponent
  },
  {
    path: 'recommended-instructors', component: RecommendedInstructorsComponent
  },
  {
    path: 'calendar-instructor', component: CalendarInstructorComponent
  },
  {
    path: 'calendar-student', component: CalendarStudentComponent
  },
  { 
    path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
