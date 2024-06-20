import {Component} from '@angular/core';
import {AdminService} from "../services/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.scss'
})
export class UpdateStudentComponent {

  validateForm: FormGroup;
  isSpinning = false;
  GENDER = ['Male', 'Female', 'Other'];
  CLASS = ["Play", "1st", "2nd", "3rd", "4th", "5th"]

  studentId: number = this.activatedRoute.snapshot.params['studentId'] // c'est le parameter qui se trouve dans admin routing {path: "student/:studentId", component: UpdateStudentComponent},

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private service: AdminService, private activatedRoute: ActivatedRoute,
              private router: Router) {
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

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.params['studentId'];
    this.getStudentById()
  }

  getStudentById() {
    this.service.getStudentById(this.studentId).subscribe((res) => {
      const student = res.studentDto;
      this.validateForm.patchValue(student);
      console.log(res);
    })
  }

  onSubmit(): void {
    if (this.validateForm.invalid) {
      return;
    }
    console.log(this.validateForm.value);
    //this.isSpinning = true;
    this.service.updateStudent(this.studentId, this.validateForm.value).subscribe(
      (res) => {
        if (res.id != null) {
          this.router.navigateByUrl('/admin/students')
          this.snackBar.open('Student updated successfully', 'Close', { duration: 5000 });
        } else {
          this.snackBar.open('Something went wrong', 'Close', { duration: 5000 });
        }
        console.log(res);
      },
      (error) => {
        console.error('Error occurred while updating student:', error);
        this.snackBar.open('Error occurred while updating student', 'Close', { duration: 5000 });
      }
    );
  }

}
