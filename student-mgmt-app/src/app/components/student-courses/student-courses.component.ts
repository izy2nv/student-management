import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { selectAllCourses, selectStudents } from '../../store/selectors/students.selector';
import { IStudent } from '../../interfaces/student';
import { PickListModule } from 'primeng/picklist';
import { getAllCourses } from '../../store/actions/students.actions';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { uniqBy } from 'lodash';
import { PromptComponent } from '../../shared/prompt/prompt.component';
import { updateStudentCourses } from '../../store/actions/students.actions';
import { isEqual, sortBy } from 'lodash';
import *  as Actions from '../../store/actions/students.actions';
import { ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { AppComponent } from '../../app.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-student-courses',
  imports: [PickListModule, RouterModule, RouterLink, CommonModule, ButtonModule, PromptComponent],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.scss'
})
export class StudentCoursesComponent implements OnInit {
  allCourses: Array<object> | undefined;
  studentCourseList: Array<object> | undefined;
  studentId: string | null = this.route.snapshot.paramMap.get('id');
  student: IStudent | any;
  initialCourses: Array<object> = [];
  private subscription: Subscription | undefined;
  @ViewChild('prompt') prompt: PromptComponent | undefined;
  constructor(private store: Store<any>, private route: ActivatedRoute,
    private cdr: ChangeDetectorRef, private router: Router, private actionsSubject: ActionsSubject,
    private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getStudent(this.studentId);
    this.cdr.markForCheck();
    this.getAllCourses();
  }

  getStudent(id: string | null) {
    this.store.select(selectStudents).subscribe((students) => {
      this.student = students.find((student: IStudent) => student.id == id);
      if (!this.student) {
        this.store.dispatch(Actions.getStudent({ id: <string>this.studentId }));
      }
      const courses = this.student?.courses?.length ? this.student.courses : [];
      this.studentCourseList = sortBy([...courses], (course) => course.name);
      this.initialCourses = sortBy([...courses], (course) => course.name);
    });
  }

  getAllCourses() {
    this.store.dispatch(getAllCourses());
    this.store.select(selectAllCourses).subscribe((courses) => {
      this.allCourses = sortBy([...courses], (course) => course.name);
    });
  }

  showDialog() {
    this.prompt?.showPrompt(this.studentCourseList?.length ?
      'Are you sure you want to update the courses for this student?' :
      'Are you sure you want to remove all courses for this student?');
  }

  updateStudentCourses() {
    let payload = {
      studentId: this.studentId,
      courses: { courses: this.studentCourseList }
    }
    this.store.dispatch(updateStudentCourses({ payload }));
    this.subscription = this.actionsSubject.pipe(
      ofType(Actions.updateStudentCoursesSuccess)
    ).pipe(
      take(1)).subscribe(action => {
        if (action) {
          this.appComponent.showSuccess('Courses updated successfully.');
        }
      });
  }

  onMoveToTarget() {
    this.studentCourseList = sortBy(uniqBy(this.studentCourseList, 'id'), (course: any) => course.name);
  }

  onMoveToSource() {
    this.allCourses = uniqBy(this.allCourses, 'id');
  }

  areArraysEqual() {
    return isEqual(this.initialCourses, this.studentCourseList);
  }
}
