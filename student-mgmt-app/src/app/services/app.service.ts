import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  base = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getStudents(): Observable<object> {
    return this.http.get(this.base + 'students');
  }

  getStudent(id: string): Observable<object> {
    return this.http.get(this.base + 'students/' + id);
  }

  addStudent(student: IStudent): Observable<object> {
    return this.http.post(this.base + 'students', student);
  }

  updateStudent(student: IStudent): Observable<object> {
    return this.http.put(this.base + 'students/' + student.id, student);
  }

  deleteStudent(id: string): Observable<object> {
    return this.http.delete(this.base + 'students/' + id);
  }

  getAllCourses(): Observable<any> {
    return this.http.get(this.base + 'courses');
  }

  updateStudentCourses(payload: any): Observable<any> {
    return this.http.patch(this.base + 'students/' + payload.studentId, payload.courses);
  }
}
