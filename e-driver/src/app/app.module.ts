import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { MenuComponent } from './menu/menu.component';
import { FiveStarsComponent } from './five-stars/five-stars.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up-folder/sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { InstructorsComponent } from './instructor-folder/instructor-list/instructors.component';
import { RatingsRecivedComponent } from './ratings-recived/ratings-recived.component';
import { RateLessonsComponent } from './rate-lessons/rate-lessons.component';

import { DrivingSchoolsCreateComponent } from './driving-schools-folder/driving-schools-create/driving-schools-create.component';
import { DrivingSchoolsFormComponent } from './driving-schools-folder/driving-schools-form/driving-schools-form.component';
import { DrivingSchoolsEditComponent } from './driving-schools-folder/driving-schools-edit/driving-schools-edit.component';
import { DrivingSchoolsComponent } from './driving-schools-folder/driving-schools/driving-schools.component';
import { StudentFormComponent } from './student-folder/student-form/student-form.component';
import { InstructorFormComponent } from './instructor-folder/registration-instructor-form/instructor-form.component';
import { ChooseInstructorComponent } from './choose-instructor/choose-instructor.component';
import { StudentRequestsComponent } from './student-requests/student-requests.component';
import { InstructorDetailsComponent } from './instructor-folder/instructor-details/instructor-details.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RecommendedInstructorsComponent } from './recommended-instructors/recommended-instructors.component';

import {AuthModule} from '@auth0/auth0-angular';
import {environment} from 'src/environments/environment.development';
import { StudentListComponent } from './student-list/student-list.component';
import { RecivedCommentsComponent } from './recived-comments/recived-comments.component';

import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

import { DatePipe } from '@angular/common';
import { RateInstructorComponent } from './rate-instructor/rate-instructor.component';
import { InstructorDrivingschoolsComponent } from './instructor-folder/instructor-drivingschools/instructor-drivingschools.component';
import { CalendarInstructorComponent } from './lesson-folder/calendar-instructor/calendar-instructor.component';
import { CalendarStudentComponent } from './lesson-folder/calendar-student/calendar-student.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FiveStarsComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    InstructorsComponent,
    RatingsRecivedComponent,
    RateLessonsComponent,
    DrivingSchoolsComponent,
    DrivingSchoolsCreateComponent,
    DrivingSchoolsFormComponent,
    DrivingSchoolsEditComponent,
    StudentFormComponent,
    InstructorFormComponent,
    ChooseInstructorComponent,
    StudentRequestsComponent,
    InstructorDetailsComponent,
    HomeComponent,
    LoginFormComponent,
    RecommendedInstructorsComponent,
    StudentListComponent,
    RecivedCommentsComponent,
    RateInstructorComponent,
    InstructorDrivingschoolsComponent,
    CalendarInstructorComponent,
    CalendarStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-owje44ze6xddyhmf.us.auth0.com',
      clientId: 'd9v0iFvLx0YLRgvkkXmTsscK59gZ2z5R'
    }),
    NgxMatDatetimePickerModule, 
           NgxMatNativeDateModule, 
           NgxMatTimepickerModule 
  ],
  providers: [LoginComponent, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
