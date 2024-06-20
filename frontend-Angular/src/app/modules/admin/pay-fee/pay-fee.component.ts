import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../services/admin.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-pay-fee',
  templateUrl: './pay-fee.component.html',
  styleUrl: './pay-fee.component.scss'
})
export class PayFeeComponent {

  studentId: number = this.activatedroute.snapshot.params['studentId'];
  validateForm!: FormGroup;
  isSpinning = false;
  MONTH: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(private service: AdminService, private activatedroute: ActivatedRoute, private fb: FormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      amount: ['', [Validators.required]],
      month: ['', [Validators.required]],
      givenBy: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  payFee() {
    console.log(this.validateForm.value);
    this.service.payFee(this.studentId, this.validateForm.value).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error('Error occurred:', err);
      }
    );
  }

}
