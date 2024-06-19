import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../services/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-post-student',
  templateUrl: './post-student.component.html',
  styleUrl: './post-student.component.scss'
})
export class PostStudentComponent implements OnInit {
  validateForm: FormGroup;
  isSpinning = false;

  GENDER = ['Male', 'Female', 'Other'];
  CLASS = ["Play", "1st", "2nd", "3rd", "4th", "5th"]

  constructor(private fb: FormBuilder, private service: AdminService, private snackBar: MatSnackBar) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      studentClass: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.validateForm.value)
    //this.isSpinning = true;
    this.service.addStudent(this.validateForm.value).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open("Student added successfully", "Close", {duration: 5000})
      } else {
        this.snackBar.open("Student already exist", "Close", {duration: 5000})
      }
      console.log(res)
    })
  }
}
