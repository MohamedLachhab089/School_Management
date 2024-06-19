import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";

const basic_url = 'http://localhost:8082/';
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private storage: StorageService, private router: Router) {}

  private hasToken(): boolean {
    return !!this.storage.getToken();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(basic_url + "authenticate", {
      email,
      password
    }, { observe: 'response' }).pipe(
      tap(() => this.log("User Authentication")),
      map((res: HttpResponse<any>) => {
        this.storage.saveUser(res.body);
        const tokenLength = res.headers.get(AUTH_HEADER)!.length;
        const bearerToken = res.headers.get(AUTH_HEADER)!.substring(7, tokenLength);
        this.storage.saveToken(bearerToken);
        this.loggedIn.next(true);
        return res;
      })
    );
  }

  logout(): void {
    this.storage.clearToken();
    this.storage.clearUser();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isAdminLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isStudentLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  log(message: string) {
    console.log(message);
  }
}
