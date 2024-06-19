import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../services/storage.service";
import {Observable} from "rxjs";

const basic_url = 'http://localhost:8082/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private storage: StorageService) {
  }

  addStudent(studentDto: any): Observable<any> {
    return this.http.post<[]>(basic_url + "api/admin/student", studentDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllStudents(): Observable<any> {
    return this.http.get<[]>(basic_url + "api/admin/students", {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteStudent(studentId: number): Observable<any> {
    const url = `${basic_url}api/admin/student/${studentId}`;
    return this.http.delete<any>(url, {
      headers: this.createAuthorizationHeader()
    });
  }


  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization', "Bearer " + this.storage.getToken()
    )
  }
}
