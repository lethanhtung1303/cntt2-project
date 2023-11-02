import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {HomeComponent} from './view/home/home.component';
import {EmployeeListComponent} from './view/employee/employee-list/employee-list.component';
import {AddEmployeeComponent} from './view/employee/add-employee/add-employee.component';
import {EmployeeDetailComponent} from './view/employee/employee-detail/employee-detail.component';
import {LoginComponent} from './view/login/login.component';
import {PageNotFoundComponent} from './view/page-not-found/page-not-found.component';
import {RewardListComponent} from './view/reward/reward-list/reward-list.component';
import {RewardDetailComponent} from './view/reward/reward-detail/reward-detail.component';
import {AddRewardComponent} from './view/reward/add-reward/add-reward.component';
import {DisciplineListComponent} from './view/discipline/discipline-list/discipline-list.component';
import {DisciplineDetailComponent} from './view/discipline/discipline-detail/discipline-detail.component';
import {AddDisciplineComponent} from './view/discipline/add-discipline/add-discipline.component';
import {AuthGuardWithLogin} from "./auth-guard/AuthGuardWithLogin";
import {AuthGuardWithoutLogin} from "./auth-guard/AuthGuardWithoutLogin";

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    canActivateChild: [AuthGuardWithLogin],
    children: [
      {path: '', component: HomeComponent},

      {path: 'employee', component: EmployeeListComponent},
      {path: 'employee/add', component: AddEmployeeComponent},
      {path: 'employee/:id', component: EmployeeDetailComponent},

      {path: 'reward', component: RewardListComponent},
      {path: 'reward/add', component: AddRewardComponent},
      {path: 'reward/:id', component: RewardDetailComponent},

      {path: 'discipline', component: DisciplineListComponent},
      {path: 'discipline/add', component: AddDisciplineComponent},
      {path: 'discipline/:id', component: DisciplineDetailComponent},
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
