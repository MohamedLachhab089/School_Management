import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(a => a.AdminModule), canActivate: [AuthGuard]},
  {path: "student", loadChildren: () => import("./modules/student/student.module").then(s => s.StudentModule), canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
