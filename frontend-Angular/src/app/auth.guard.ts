import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {StorageService} from "./services/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router, private snackbar: MatSnackBar) {}

  canActivate(): boolean {
    const token = this.storageService.getToken();
    if (token) {
      return true;
    } else {
      this.router.navigate(['login']);
      this.snackbar.open("You don't have the access to this page", "Close",{
        duration: 5000
      });
      return false;
    }
  }
}
