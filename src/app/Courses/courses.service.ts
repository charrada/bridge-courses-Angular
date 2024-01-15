import { Injectable } from '@angular/core';
import { course } from '../models/course.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

    private apiUrl = 'http://localhost:8089/Bridge'; // Replace with your API base URL
  
    constructor(private httpClient: HttpClient) { }
  
    addCourse(course: course): Observable<course> {
      return this.httpClient.post<course>(`${this.apiUrl}/addCourse`, course);
    }
  
    updateCourse(course: course): Observable<course> {
      return this.httpClient.put<course>(`${this.apiUrl}/updateCourse`, course);
    }
  
    deleteCourse(courseId: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.apiUrl}/deleteCourse/${courseId}`);
    }
  
    getCourseById(courseId: number): Observable<course> {
      return this.httpClient.get<course>(`${this.apiUrl}/getCourseById/${courseId}`);
    }
    
    getAllCourses(): Observable<course[]> {
      return this.httpClient.get<course[]>(`${this.apiUrl}/`);
    }
  
}
