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
} from "./view/InstructorStandards/University/university-lecturer-list/university-lecturer-list.component";
import {
  MasterLecturerListComponent
} from "./view/InstructorStandards/MasterDegree/master-lecturer-list/master-lecturer-list.component";
import {LecturersDetailComponent} from "./view/Lecturers/lecturers-detail/lecturers-detail.component";

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    canActivateChild: [AuthGuardWithLogin],
    children: [
      {path: 'home', component: HomeComponent},

      {path: 'lecturers', component: LecturersListComponent},
      {path: 'lecturers/add', component: LecturersListComponent},
      {path: 'lecturers/:id', component: LecturersDetailComponent},

      {path: 'university-lecturer', component: UniversityLecturerListComponent},
      {path: 'university-lecturer/add', component: UniversityLecturerListComponent},
      {path: 'university-lecturer/:id', component: UniversityLecturerListComponent},

      {path: 'master-lecturer', component: MasterLecturerListComponent},
      {path: 'master-lecturer/add', component: MasterLecturerListComponent},
      {path: 'master-lecturer/:id', component: MasterLecturerListComponent},

      {path: 'subject', component: LecturersListComponent},
      {path: 'subject/add', component: LecturersListComponent},
      {path: 'subject/:id', component: LecturersListComponent},

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

      {path: 'statistics-number-periods', component: LecturersListComponent},
      {path: 'statistics-number-periods/add', component: LecturersListComponent},
      {path: 'statistics-number-periods/:id', component: LecturersListComponent},

      {path: 'norms-lecture-hours', component: LecturersListComponent},
      {path: 'norms-lecture-hours/add', component: LecturersListComponent},
      {path: 'norms-lecture-hours/:id', component: LecturersListComponent},

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
