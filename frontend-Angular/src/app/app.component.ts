import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isAdminLoggedIn: boolean = false;
  isStudentLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.isAdminLoggedIn = true) {
      this.AdminLoggedIn()
    } else {
      this.StudentLoggedIn()
    }
  }

  AdminLoggedIn() {
    this.authService.isAdminLoggedIn().subscribe(isAdminLoggedIn => {
      this.isAdminLoggedIn = isAdminLoggedIn;
    });
  }

  StudentLoggedIn() {
    this.authService.isStudentLoggedIn().subscribe(isStudentLoggedIn => {
      this.isStudentLoggedIn = isStudentLoggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
