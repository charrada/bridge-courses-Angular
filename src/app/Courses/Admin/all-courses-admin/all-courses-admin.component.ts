import { Component } from '@angular/core';
import { course } from 'src/app/models/course.model';
import { CoursesService } from '../../courses.service';
import { Router } from '@angular/router';
declare var $: any; // declare jQuery

@Component({
  selector: 'app-all-courses-admin',
  templateUrl: './all-courses-admin.component.html',
  styleUrls: ['./all-courses-admin.component.css']
})
export class AllCoursesAdminComponent {
  courses: course[] = [];
  searchTerm: string = '';
  courseToDelete: course | null = null; 
  currentPage: number = 1; 
  itemsPerPage: number = 5; 

  constructor(private coursesService: CoursesService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getAllCourses().subscribe(
      (data: course[]) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error loading courses:', error);
      }
    );
  }

  filterCourses(): course[] {
    const filteredCourses = this.courses.filter((course) =>
      course.nameCourse.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return filteredCourses.slice(startIndex, endIndex);
  }

  confirmDelete(course: course): void {
    this.courseToDelete = course; 
    $('#deleteModal').modal('show'); 
  }

  deleteCourse(): void {
    if (this.courseToDelete) {
      this.coursesService.deleteCourse(this.courseToDelete.idCourse).subscribe(
        () => {
          console.log('Deleted course:', this.courseToDelete);
          this.loadCourses(); 
        },
        (error) => {
          console.error('Error deleting course:', error);
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
}
