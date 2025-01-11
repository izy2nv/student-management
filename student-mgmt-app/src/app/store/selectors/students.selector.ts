import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IStudentsState } from "../reducers/students.reducers";

export const selectStudentsState = createFeatureSelector<IStudentsState>('students');

export const selectStudents = createSelector(
    selectStudentsState,
    (state) => state?.students
);

export const selectStudent = createSelector(
    selectStudentsState,
    (state) => state?.student
);

export const selectStudentsLoading = createSelector(
    selectStudentsState,
    (state) => state?.loading
);

export const selectStudentsError = createSelector(
    selectStudentsState,
    (state) => state?.error
);

export const selectAllCourses = createSelector(
    selectStudentsState,
    (state) => state?.allCourses
);