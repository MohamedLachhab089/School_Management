import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.login(
      this.loginForm.get('email')!.value,
      this.loginForm.get('password')!.value
    ).subscribe(
      (response) => {
        console.log(response);
        if (this.storageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("admin/dashboard");
        } else if (this.storageService.isStudentLoggedIn()) {
          this.router.navigateByUrl("student/dashboard");
        }
      },
      (error) => {
        if (error.status === 406) {
          this.snackbar.open("User is not active", "Close",{
            duration: 5000
          });
        } else {
          this.snackbar.open("Bad credentials", "Close",{
            duration: 5000
          });
        }
      }
    );
  }
}
