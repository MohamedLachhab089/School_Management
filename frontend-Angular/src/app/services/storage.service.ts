import { Injectable } from '@angular/core';

const USER = "User";
const TOKEN = "Token";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  saveUser(user: any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  saveToken(token: string) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  getUser(): any {
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.role;
  }

  clearToken(): void {
    window.localStorage.removeItem(TOKEN);
  }

  clearUser(): void {
    window.localStorage.removeItem(USER);
  }

  isAdminLoggedIn(): boolean {
    const token = this.getToken();
    if (token == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === "ADMIN";
  }

  isStudentLoggedIn(): boolean {
    const token = this.getToken();
    if (token == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === "STUDENT";
  }
}
