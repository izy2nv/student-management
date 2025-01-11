import { createAction, props } from "@ngrx/store";
import { IStudent } from "../../interfaces/student";
import { StudentActionTypes } from "./students.actionTypes";

export const getStudents = createAction(StudentActionTypes.GET_STUDENTS);
export const getStudentsSuccess = createAction(StudentActionTypes.GET_STUDENTS_SUCCESS, props<{ students: IStudent[] | any }>());
export const getStudentsError = createAction(StudentActionTypes.GET_STUDENTS_ERROR, props<{ error: any }>());

export const getStudent = createAction(StudentActionTypes.GET_STUDENT, props<{ id: string }>());
export const getStudentSuccess = createAction(StudentActionTypes.GET_STUDENT_SUCCESS, props<{ student: IStudent | any }>());

export const addStudent = createAction(StudentActionTypes.ADD_STUDENT, props<{ student: any }>());
export const addStudentSuccess = createAction(StudentActionTypes.ADD_STUDENT_SUCCESS, props<{ student: any }>());

export const deleteStudent = createAction(StudentActionTypes.DELETE_STUDENT, props<{ id: string }>());
export const deleteStudentSuccess = createAction(StudentActionTypes.DELETE_STUDENT_SUCCESS, props<{ id: string }>());

export const updateStudent = createAction(StudentActionTypes.UPDATE_STUDENT, props<{ student: any }>());
export const updateStudentSuccess = createAction(StudentActionTypes.UPDATE_STUDENT_SUCCESS, props<{ student: any }>());

export const getAllCourses = createAction(StudentActionTypes.GET_ALL_COURSES);
export const getAllCoursesSuccess = createAction(StudentActionTypes.GET_ALL_COURSES_SUCCESS, props<{ allCourses: any }>());

export const updateStudentCourses = createAction(StudentActionTypes.UPDATE_STUDENT_COURSES, props<{ payload: any }>());
export const updateStudentCoursesSuccess = createAction(StudentActionTypes.UPDATE_STUDENT_COURSES_SUCCESS, props<{ payload: any }>());
