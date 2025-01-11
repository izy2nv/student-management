// counter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as Actions from '../actions/students.actions';
import { IStudent } from '../../interfaces/student';


export interface IStudentsState {
    students: IStudent[];
    student: IStudent;
    allCourses: any[];
    loading: boolean;
    error: any;
}
export const initialState: IStudentsState = {
    students: [],
    student: {} as IStudent,
    allCourses: [],
    loading: false,
    error: null
};

export const studentsReducer = createReducer(
    initialState,
    on(Actions.getStudents, (state) => ({ ...state, loading: true })),
    on(Actions.getStudentsSuccess, (state, { students }) =>
    ({
        ...state, students: students.map((student: IStudent) => { return { ...student, student } }), loading: false, error: null
    })),
    on(Actions.getStudentsError, (state, { error }) => ({ ...state, loading: false, error: error })),
    // on(Actions.getStudentSuccess, (state, { student }) => ({ ...state, students: [...state.students, student], error: null })),
    on(Actions.getStudentSuccess, (state, { student }) => ({ ...state, student: student, error: null })),
    on(Actions.addStudentSuccess, (state, { student }) => ({ ...state, students: [...state.students, student], error: null })),
    on(Actions.updateStudentSuccess, (state, { student }) => ({ ...state, students: state.students.map((s) => s.id == student.id ? { ...student, student } : s), error: null })),
    on(Actions.deleteStudentSuccess, (state, { id }) => ({ ...state, students: state.students.filter((student) => student.id !== id)})),
    on(Actions.getAllCourses, (state) => ({ ...state, loading: true })),
    on(Actions.getAllCoursesSuccess, (state, { allCourses }) => ({ ...state, allCourses, loading: false })),
    on(Actions.updateStudentCoursesSuccess, (state, { payload }) => ({ ...state, students: state.students.map((student) => student.id === payload.studentId ? { ...student, courses: payload.courses.courses } : student) }))
);