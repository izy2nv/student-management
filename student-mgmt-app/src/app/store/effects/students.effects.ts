import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AppService } from '../../services/app.service';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as studentsActions from '../actions/students.actions';
import { IStudent } from '../../interfaces/student';

@Injectable()
export class DashboardEffects {
  constructor(private actions$: Actions, private appService: AppService) { }

  getStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentsActions.getStudents),
      mergeMap(() =>
        this.appService.getStudents().pipe(
          map((students) => studentsActions.getStudentsSuccess({ students })),
          catchError((error) => of(studentsActions.getStudentsError({ error })))
        )
      )
    )
  );

  getStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentsActions.getStudent),
      switchMap(({ id }) =>
        this.appService.getStudent(id).pipe(
          map((student) => studentsActions.getStudentSuccess({ student })),
          catchError((error) => of(studentsActions.getStudentsError({ error })))
        )
      )
    )
  );

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentsActions.addStudent),
      switchMap(({ student }) =>
        this.appService.addStudent(student).pipe(
          map((response) => studentsActions.addStudentSuccess({ student: response })),
          catchError((error) => of(studentsActions.getStudentsError({ error })))
        )
      )
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentsActions.updateStudent),
      switchMap(({ student }) => {
        return this.appService.updateStudent(student).pipe(
          map(() => studentsActions.updateStudentSuccess({ student })),
          catchError((error) => of(studentsActions.getStudentsError({ error })))
        )
      })
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentsActions.deleteStudent),
      switchMap(({ id }) =>
        this.appService.deleteStudent(id).pipe(
          map(() => studentsActions.deleteStudentSuccess({ id: id })),
          catchError((error) => of(studentsActions.getStudentsError({ error })))
        )
      )
    )
  );

  getAllCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentsActions.getAllCourses),
      mergeMap(() =>
        this.appService.getAllCourses().pipe(
          map((allCourses) => studentsActions.getAllCoursesSuccess({ allCourses })),
          catchError((error) => of(studentsActions.getStudentsError({ error })))
        )
      )
    )
  );

  manageStudentCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentsActions.updateStudentCourses),
      switchMap(({ payload }) =>
        this.appService.updateStudentCourses(payload).pipe(
          map(() => studentsActions.updateStudentCoursesSuccess({ payload })),
          catchError((error) => of(studentsActions.getStudentsError({ error })))
        )
      )
    )
  );
}