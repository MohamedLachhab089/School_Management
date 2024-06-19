import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PostStudentComponent} from "./post-student/post-student.component";
import {AllStudentsComponent} from "./all-students/all-students.component";

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "student", component: PostStudentComponent},
  {path: "students", component: AllStudentsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
