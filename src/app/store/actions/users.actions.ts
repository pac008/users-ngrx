import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';


export const getUsers = createAction('[Users] get User');

export const getUsersSuccess = createAction(
    '[Users] Get Usuarios Success',
    props<{users:User[]}>()
    );

export const getUsersError = createAction(
    '[Users] Get Users Error',
    props<{payload:any}>()
    );