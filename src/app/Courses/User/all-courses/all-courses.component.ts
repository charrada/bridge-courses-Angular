import { Component } from '@angular/core';
import { course } from 'src/app/models/course.model';
import { CoursesService } from '../../courses.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {

  courses: course[] = [];

  courseImages: { [id: number]: string } = {}; // Map each course

  constructor(private coursesService: CoursesService, private router: Router, private http: HttpClient) {}



  ngOnInit(): void {
    this.loadCourses();

    this.coursesService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }

  loadCourses(): void {
    this.coursesService.getAllCourses().subscribe(
      (data: course[]) => {
        this.courses = data;
        this.courses.forEach(course => {
          this.getImage(course.idCourse);
        });
      },
      (error) => {
        console.error('Error loading courses:', error);
      }
    );
  }
  getImage(idCourse: number): void {
    this.http.get(`http://localhost:8089/image/get/${idCourse}`).subscribe(
      (res: any) => {
        const base64Data = res.picByte;
        const retrievedImage = 'data:image/jpeg;base64,' + base64Data;
        this.courseImages[idCourse] = retrievedImage;
      },
      (error: any) => {
        console.error('Error loading image for course:', error);
      }
    );
  }
}
