import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {HomeComponent} from './view/home/home.component';
import {LoginComponent} from './view/login/login.component';
import {PageNotFoundComponent} from './view/page-not-found/page-not-found.component';
import {AuthGuardWithLogin} from "./auth-guard/AuthGuardWithLogin";
import {AuthGuardWithoutLogin} from "./auth-guard/AuthGuardWithoutLogin";
import {LecturersListComponent} from "./view/Lecturers/lecturers-list/lecturers-list.component";
import {
  UniversityLecturerListComponent
} from "./view/LecturerStandards/university-lecturer-list/university-lecturer-list.component";
import {
  MasterLecturerListComponent
} from "./view/LecturerStandards/master-lecturer-list/master-lecturer-list.component";
import {LecturersDetailComponent} from "./view/Lecturers/lecturers-detail/lecturers-detail.component";
import {
  EditTrainingProcessComponent
} from "./view/Lecturers/lecturers-detail/tab/lecturer-training-process/edit-training-process/edit-training-process.component";
import {SubjectsListComponent} from "./view/Subjects/subjects-list/subjects-list.component";
import {SubjectDetailComponent} from "./view/Subjects/subject-detail/subject-detail.component";
import {NormsLectureHoursComponent} from "./view/norms-lecture-hours/norms-lecture-hours.component";

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    canActivateChild: [AuthGuardWithLogin],
    children: [
      {path: 'home', component: HomeComponent},

      {path: 'lecturers', component: LecturersListComponent},
      {path: 'lecturers/:id', component: LecturersDetailComponent},
      {path: 'lecturers/:id/training-process/:training-process-id/edit', component: EditTrainingProcessComponent},

      {path: 'subject', component: SubjectsListComponent},
      {path: 'subject/:id', component: SubjectDetailComponent},

      {path: 'university-lecturer', component: UniversityLecturerListComponent},

      {path: 'master-lecturer', component: MasterLecturerListComponent},

      {path: 'norms-lecture-hours', component: NormsLectureHoursComponent},
      {path: 'norms-lecture-hours/add', component: NormsLectureHoursComponent},
      {path: 'norms-lecture-hours/:id', component: NormsLectureHoursComponent},

      {path: 'satisfaction-score', component: LecturersListComponent},
      {path: 'satisfaction-score/add', component: LecturersListComponent},
      {path: 'satisfaction-score/:id', component: LecturersListComponent},

      {path: 'teaching-history', component: LecturersListComponent},
      {path: 'teaching-history/add', component: LecturersListComponent},
      {path: 'teaching-history/:id', component: LecturersListComponent},

      {path: 'assign-lecture-hours', component: LecturersListComponent},
      {path: 'assign-lecture-hours/add', component: LecturersListComponent},
      {path: 'assign-lecture-hours/:id', component: LecturersListComponent},

      {path: 'guest-lecturers', component: LecturersListComponent},
      {path: 'guest-lecturers/add', component: LecturersListComponent},
      {path: 'guest-lecturers/:id', component: LecturersListComponent},

      {path: 'faculty-members', component: LecturersListComponent},
      {path: 'faculty-members/add', component: LecturersListComponent},
      {path: 'faculty-members/:id', component: LecturersListComponent},

      {path: '', redirectTo: 'home', pathMatch: 'full'}, // redirect to `home-component`
    ],
  },
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardWithoutLogin],},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
