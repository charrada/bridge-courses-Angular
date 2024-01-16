import { Component, OnInit } from '@angular/core';
import { course } from 'src/app/models/course.model';
import { CoursesService } from '../../courses.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-all-courses-admin',
  templateUrl: './all-courses-admin.component.html',
  styleUrls: ['./all-courses-admin.component.css']
})
export class AllCoursesAdminComponent implements OnInit {
  courses: course[] = [];
  searchTerm: string = '';
  courseToDelete: course | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  courseImages: { [id: number]: string } = {}; // Map each course

  constructor(private coursesService: CoursesService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCourses();
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

  filterCourses(): course[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.courses
      .filter((course) => course.nameCourse.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice(startIndex, endIndex);
  }

  confirmDelete(course: course): void {
    this.courseToDelete = course;
    $('#deleteModal').modal('show');
  }

  deleteCourse(): void {
    if (this.courseToDelete) {

          console.log('Deleted image for course:', this.courseToDelete!.idCourse);
  
          this.coursesService.deleteCourse(this.courseToDelete!.idCourse).subscribe(
            () => {

              this.http.delete(`http://localhost:8089/image/delete/${this.courseToDelete!.idCourse}`).subscribe(
                () => { });
              console.log('Deleted course:', this.courseToDelete);
              this.loadCourses();
            },
            (error: any) => {
              console.error('Error deleting course:', error);
              this.loadCourses(); 
            }
          );
     
    }
  
    $('#deleteModal').modal('hide');
  }

  closeDelete(): void {
    $('#deleteModal').modal('hide');
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  getTotalPages(): number[] {
    const totalCourses = this.filterCourses().length;
    const totalPages = Math.ceil(totalCourses / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
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
