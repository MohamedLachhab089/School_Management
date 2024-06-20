import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PostStudentComponent} from "./post-student/post-student.component";
import {AllStudentsComponent} from "./all-students/all-students.component";
import {UpdateStudentComponent} from "./update-student/update-student.component";
import {PayFeeComponent} from "./pay-fee/pay-fee.component";

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "student", component: PostStudentComponent},
  {path: "students", component: AllStudentsComponent},
  {path: "student/:studentId", component: UpdateStudentComponent},
  {path: "fee/:studentId", component: PayFeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
